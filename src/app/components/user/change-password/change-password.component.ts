import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import UserService from './../../../services/UserService';
import AuthService from './../../../services/AuthService';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export default class ChangePasswordComponent implements OnInit {
    
    private oldPassword: string;
    private password: string;
    private passwordConfirmation: string;

    private errorMessage: string;

    constructor(
        private _userService: UserService,
        private _authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this._authService.isAuthenticated().subscribe(result => {
            if(!result)
                this.router.navigate(['login']);
        });
    }

    ngOnInit() {
        // TODO: Check if user has been logged in. If yes, redirect the user to home page.
    }

    changePassword() {
        if(this.validate()) {
            this._userService.changePassword({
                password: this.password,
                old_password: this.oldPassword
            }).subscribe(response => {
                if(response != true) {
                    this.errorMessage = response;
                } else {
                    localStorage.setItem('success_message', 'Your password has been updated. You could now sign in with your new password.');
                    this._authService.logout();
                }
            });
        }
    }

    validate() {
        let isValid = true;
        if(this.oldPassword == '' || this.oldPassword == undefined) {
            this.errorMessage = 'The Old Password field is required';
            isValid = false;
        } else if(this.password == '' || this.password == undefined) {
            this.errorMessage = 'The New Password field is required';
            isValid = false;
        } else if(this.passwordConfirmation == '' || this.passwordConfirmation == undefined) {
            this.errorMessage = 'The New Password Confirmation field is required';
            isValid = false;
        } else if(this.passwordConfirmation !== this.password) {
            this.errorMessage = 'The New Password Confirmation field must be equal to New Password field';
            isValid = false;
        } else {
            this.errorMessage = '';
        }

        return isValid;
    }
}