import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import AuthService from '../../services/AuthService';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {
    
    private email: string;
    private password: string;

    private errorMessage: string;
    private successMessage: string;

    constructor(
        private _authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this._authService.isAuthenticated().subscribe(result => {
            if(result)
                this.router.navigate(['home']);

            const successMessage = localStorage.getItem('success_message');
            if(successMessage != undefined && successMessage != null) {
                this.successMessage = successMessage;
                localStorage.removeItem('success_message');
            }
        });
    }

    ngOnInit() {
        // TODO: Check if user has been logged in. If yes, redirect the user to home page.
    }

    login() {
        if(this.validate()) {
            this._authService.login(this.email, this.password)
                .subscribe(response => {
                    if(response != undefined && response != '') {
                        this.errorMessage = response;
                    }
                });
        }
    }

    validate() {
        let isValid = true;
        if(this.email == '' || this.email == undefined) {
            this.errorMessage = 'The Email field is required';
            isValid = false;
        } else if(this.password == '' || this.password == undefined) {
            this.errorMessage = 'The Password field is required';
            isValid = false;
        } else {
            this.errorMessage = '';
        }

        return isValid;
    }
}