import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export default class AuthService {
    public isLoggedIn = new BehaviorSubject(null);

    constructor(
        private _http: Http,
        private router: Router
    ) { }
    
    isAuthenticated() {
        return this._http.get(environment.apiBaseUrl + '/products/paginate/1/1?api_token=' + localStorage.getItem('api_token'))
            .map(response => {
                const json = response.json();
                if(json.message !== undefined && json.message !== null) {
                    this.isLoggedIn.next(false);
                } else {
                    this.isLoggedIn.next(true);
                }
                return this.isLoggedIn.value;
            });
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('api_token');
        this.isLoggedIn.next(false);
        this.router.navigate(['login']);
    }

    login(email, password) {
        return this._http.post(environment.apiBaseUrl + '/login', {
                email: email,
                password: password
            })
            .map(response => {
                const success = response.json().success;
                const message = response.json().message;
                if(success) {
                    const apiToken = response.json().api_token;
                    localStorage.setItem('user', JSON.stringify(message));
                    localStorage.setItem('api_token', apiToken);
                    this.isLoggedIn.next(true);
                    this.router.navigate(['home']);
                }
                return message;
            });
    }

    getToken() {
        const token = localStorage.getItem('api_token');
        return token;
    }

    getUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user;
    }

    validate() {
        this.isAuthenticated().subscribe(value => {
            if(!value) {
                this.router.navigate(['login']);
            }
        });
    }

}