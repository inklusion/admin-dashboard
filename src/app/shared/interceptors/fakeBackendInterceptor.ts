import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { I18nLanguage, UserType } from '../helpers/enum';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('usersMockup')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.toLocaleLowerCase().endsWith('/authentication/login') && method === 'POST':
                    return authenticate();
                case url.toLocaleLowerCase().endsWith('/users/admins') && method === 'GET':
                    return getUsers();
                case url.toLocaleLowerCase().endsWith('/users/admin') && method === 'POST':
                    return register();
                case url.toLocaleLowerCase().match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.toLocaleLowerCase().match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.toLocaleLowerCase().match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function register() {
            const user = body;

            if (users.find(x => x.email === user.email)) {
                return error('Email "' + user.email + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            user.password = "teste";
            user.isDefault = false;
            users.push(user);
            localStorage.setItem('usersMockup', JSON.stringify(users));

            return ok(user);
        }

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (user) {
                return ok({
                    ...user,
                    token: "fake-jwt-token"
                });
            }
            if (email != "teste@teste.pt" && password != "teste") return error("Email or password is incorrect.");
            return ok({
                id: "1234",
                name: "Nuno Carapito",
                email: "teste@teste.pt",
                phoneNumber: "1234",
                password: "teste",
                token: "fake-jwt-token",
                lastLogin: new Date(),
                userType: UserType.ADMIN,
                language: I18nLanguage.PT,
                devices: [],
                loginToken: "123456",
                isActive: true
            });
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            var usersList = users ?? [];
            return ok(usersList.concat({
                "id": "6112ccfcc54cb2e9edb58f83",
                "lastLogin": "2022-02-14T10:16:35+00:00",
                "devices": [
                    {
                        "_id": "034ca3bc-6f05-4d20-a790-7c496685f072",
                        "code": "146dde62621a7cd2525e5a8edb3e9e38",
                        "userIp": "::1",
                        "expiration": "2021-12-11T22:28:37+00:00",
                        "active": true
                    }
                ],
                "email": "teste@teste.pt",
                "isPasswordUpdatePending": false,
                "isActive": true,
                "name": "Nuno Carapito",
                "phoneNumber": "",
                "dateLimitRecoveryToken": "2022-02-05T06:11:51+00:00",
                "language": 2,
                "userType": 2,
                "isDefault": true
            }))
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id == idFromUrl());
            return ok(user);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();
            users = users.filter(x => x.id !== idFromUrl()) ?? [];
            localStorage.setItem('usersMockup', JSON.stringify(users));
            return ok();
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            const user = body;


            if (users.find(x => x.id != idFromUrl() && x.email === user.email) || user.email === "teste@teste.pt") {
                return error('Email "' + user.email + '" is already taken')
            }

            let userIndex = users.findIndex(x => x.id === idFromUrl());
            users[userIndex].name = user.name;
            users[userIndex].email = user.email;
            localStorage.setItem('usersMockup', JSON.stringify(users));

            return ok(user);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError(() => { return { status: 401, error: { message: 'Unauthorised' } } });
        }

        function error(message) {
            return throwError(() => { return { statusText: message } });
        }

        function isLoggedIn() {
            // return headers.get('Authorization') === 'Bearer fake-jwt-token';
            return true;
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};