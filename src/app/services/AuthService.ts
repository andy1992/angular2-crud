import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export default class AuthService {
    constructor(private _http: Http) { }
    
    isAuthenticated() {
        return this._http.get(environment.apiBaseUrl + '/products/1/1')
            .map(response => {
                const json = response.json()
                if(json.length > 0) {
                    return true;
                }
                return false;
            });
    }

}