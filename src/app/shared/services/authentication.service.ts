import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, AuthUser, IAuthenticationService, isAuthResponse, LoginEndpointData, RegisterEndpointData, TokenRefreshEndpointData } from 'authentication-inklusion';
import { configuration } from 'configuration/configuration';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nLanguage, UserType } from '../helpers/enum';
import { languageToIndex } from '../helpers/language';
import { User } from '../models/user';
import { UserService } from './user.service';


@Injectable()
export class AuthenticationService implements IAuthenticationService {
    public currentUserSubject: BehaviorSubject<User>;
    private url = `${environment.apiURL}Authentication/`;

    constructor(
        private http: HttpClient,
        private userService: UserService,
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(loginData: LoginEndpointData): Observable<AuthResponse | AuthUser> {
        const url = `${this.url}Login`;
        return this.http.post<AuthResponse | AuthUser>(url, loginData)
            .pipe(map(data => {
                if (!isAuthResponse(data)) {
                    // login successful if there's a jwt token in the response
                    if (data && data.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        this.updateLocalStorage(data);
                        localStorage.setItem('platform', configuration.name);
                    }
                }

                return data;
            }));
    }


    refreshToken(refreshToken: string, fingerprint: string): Observable<TokenRefreshEndpointData> {
        const url = `${this.url}RefreshAccessToken`;
        return this.http.post<TokenRefreshEndpointData>(url, { refreshToken: refreshToken, fingerprint: fingerprint }).pipe(
            map((response) => {
                return response;
            }));
    }

    register(registerData: RegisterEndpointData): Observable<AuthResponse> {
        registerData.language = languageToIndex(registerData.language.toString());
        const url = `${this.url}Register`;
        return this.http.post<AuthResponse>(url, registerData).pipe(
            map((response) => {
                return response;
            }));
    }

    invite(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}invite`, user).pipe(
            map((response) => {
                return response;
            }));
    }


    resendInvite(email: string): Observable<User> {
        return this.http.post<User>(`${this.url}invite/${email}`, {}).pipe(
            map((response) => {
                return response;
            }));
    }

    forgetPassword(email: string): Observable<AuthResponse> {
        const url = `${this.url}forgetPassword/${email}`;
        return this.http.get<any>(url).pipe(map(response => {
            return response;
        }));
    }


    validateToken(recoveryToken: string): Observable<any> {
        const url = `${this.url}validateRecoveryToken`;
        return this.http.post<any>(url, { recoveryToken })
            .pipe(map(response => {
                return response;
            }));
    }

    updatePassword(recoveryToken: string, password: string): Observable<string> {
        var url = `${this.url}updatePasswordWithToken`;

        return this.http.post<string>(url, { recoveryToken, password })
            .pipe(map(response => {
                return response;
            }));
    }

    updatePasswordNoLogin(email: string, password: string, newPassword: string, authToken: string): Observable<string> {
        var url = `${this.url}UpdatePasswordNoLogin`;

        return this.http.post<any>(url, { email, password, newPassword, authToken })
            .pipe(map(response => {
                return response;
            }));
    }

    checkTwoFactorAuthenticationCode(id: string, loginToken: string, deviceFingerprint: any, rememberMe: boolean): Observable<AuthUser | AuthResponse> {
        var url = `${this.url}Validate2FA`;

        return this.http.post<AuthUser | AuthResponse>(url, { id, loginToken, deviceFingerprint, rememberMe })
            .pipe(map(data => {
                if (!isAuthResponse(data)) {
                    // login successful if there's a jwt token in the response
                    if (data && data.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        this.updateLocalStorage(data);
                        localStorage.setItem('platform', configuration.name);
                    }
                }
                return data;
            }));
    }


    activate(token: string): Observable<string> {
        return this.http.post<any>(`${this.url}activate/${token}`, {})
            .pipe(map(data => {
                return data.message;
            }));
    }

    requestNewTwoFactorAuthenticationCode(userEmail: string): Observable<string> {
        var url = `${this.url}RequestNew2Fa`;
        return this.http.get<any>(url + "/" + userEmail)
            .pipe(map(data => {
                return data.message;
            }));
    }

    //Non Interface methods

    updateLanguage(newLanguage: I18nLanguage) {
        return this.userService.updateLanguage(newLanguage).subscribe((result) => {
            const user = this.currentUserValue;
            user.language = newLanguage;
            this.updateLocalStorage(user);
            return result;
        })
    }

    updateTokens(accessToken, refreshToken) {
        var user = this.currentUserValue;
        user.token = accessToken;
        user.refreshToken = refreshToken;
        this.updateLocalStorage(user);
    }

    updateProfile(newData: User) {
        var user = this.currentUserValue;
        user.name = newData.name;
        user.email = newData.email;
        user.phoneNumber = newData.phoneNumber;
        this.updateLocalStorage(user);
    }

    updateLocalStorage(user) {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    updateRole(userType: UserType) {
        var user = this.currentUserValue;
        user.fakeUserType = userType;
        this.updateLocalStorage(user);
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}