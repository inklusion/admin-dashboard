import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { I18nLanguage } from '../helpers/enum';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    private readonly url = `${environment.apiURL}users`;

    getAllAdmins() {
        return this.http.get<User[]>(`${this.url}/admins`).pipe(map(user => {
            return user;
        }));
    }

    getAllClients() {
        return this.http.get<User[]>(`${this.url}/clients`).pipe(map(user => {
            return user;
        }));
    }

    getAllSuppliers() {
        return this.http.get<User[]>(`${this.url}/suppliers`).pipe(map(user => {
            return user;
        }));
    }

    getAllCollaborators() {
        return this.http.get<User[]>(`${this.url}/collaborators`).pipe(map(user => {
            return user;
        }));
    }

    updateLanguage(language: I18nLanguage) {
        return this.http.put<User>(`${this.url}/language`, language);
    }

    update(userId: string, user: User) {
        return this.http.put<User>(`${this.url}/${userId}`, user);
    }

    delete(id: string) {
        return this.http.delete<boolean>(`${this.url}/${id}`);
    }

    add(user: User) {
        return this.http.post<User>(`${environment.apiURL}users/admin`, user);
    }
}

    // getById(id: string) {
    //     return this.http.get<User>(`${environment.apiURL}users/${id}`);
    // }


    // update(userId: string, user: User) {
    //     return this.http.put<User>(`${environment.apiURL}users/${userId}`, user);
    // }

    // updateLanguage(userId: string, language: I18nLanguage) {
    //     return this.http.put<User>(`${environment.apiURL}users/${userId}/language`, language);
    // }

    // activate(userId: string) {
    //     return this.http.put<User>(`${environment.apiURL}users/${userId}/activate`, {});
    // }

    // delete(id: string) {
    //     return this.http.delete<boolean>(`${environment.apiURL}users/${id}`);
    // }

    // block(id: string) {
    //     return this.http.get<boolean>(`${environment.apiURL}users/block/${id}`);
    // }

    // unblock(id: string) {
    //     return this.http.get<boolean>(`${environment.apiURL}users/unblock/${id}`);
    // }

    // setProductSeen(productId: string) {
    //     return this.http.put<User>(`${environment.apiURL}admin/${productId}/productSeen`, {});
    // }