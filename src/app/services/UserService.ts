import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import AuthService from './../services/AuthService';

@Injectable()
export default class UserService {
    constructor(
        private _http: Http,
        private router: Router,
        private _authService: AuthService
    ) { }
    
    register(obj) {
        return this._http.post(environment.apiBaseUrl + '/register', obj)
            .map(res => {
                const response = res.json();
                if(response.success) {
                    this._authService.login(obj.email, obj.password).subscribe(response => {
                        
                    });
                }
            });
    }

    changePassword(obj) {
        const user = this._authService.getUser();
        const token = this._authService.getToken();
        return this._http.post(environment.apiBaseUrl + '/change-password/' + user.id + '?api_token=' + token, obj)
            .map(res => {
                const response = res.json();
                if(response.success) {
                    return true;
                } else {
                    return response.message;
                }
            });
    }

}