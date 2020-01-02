import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';

import { IUser } from './user.model';
//import decode from 'jwt-decode';

/* AuthService - the service responsible with login */
@Injectable({ providedIn: 'root' })
export class AuthService {
    currentUserSubject: BehaviorSubject<IUser>;
    currentUser: IUser;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.value;
    }

    /* check if user is authenticated */
    /* TODO: check if token expired */
    isAuthenticated(): boolean {
        return !!this.currentUser
    }

    /* Retrieve the token from Kodaris API */
    getTokenKodaris() {
        let options = { headers: new HttpHeaders({ 'Accept': 'application/json' }) };
        return this.http.get<any>('https://velocitytestapp.kodaris.com/services/api/manager/token', options);         
    }

    /* save the token to localStorage */
    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    /* save the user to localStorage */
    setUser(user: IUser) {
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    /* authenticate the user using Kodaris API */
    login(username, password, authToken):Observable<any> {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': authToken,
            }),
            withCredentials: true
        };

        let body = {
            authToken: authToken,
            userName: username,
            decryptedPassword: password,
        }
        return this.http.post<any>('https://velocitytestapp.kodaris.com/services/api/manager/login', body, options)
            .pipe(
                share(),
                tap(),
                map((response: any) => {
                    if (!!response && !!response.success) {
                        const user: IUser = {
                            currentEmail: username,
                            token: response.csrfToken
                        }
                        this.setUser(user);
                        this.setToken(response.csrfToken);
                        this.currentUser = user;
                    }
                    return of(response);
                }
                ));
    }

    /* log out the user - not used in app */
    logout() : boolean {
        localStorage.removeItem('currentUser')
        this.currentUser = null;// = undefined;;
        this.currentUserSubject.next(null);
        return true;
    }
}
