import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import UserService from './../../services/UserService';
import AuthService from './../../services/AuthService';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export default class RegisterComponent implements OnInit {
    
    private email: string;
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
            if(result)
                this.router.navigate(['home']);
        });
    }

    ngOnInit() {
        // TODO: Check if user has been logged in. If yes, redirect the user to home page.
    }

    register() {
        if(this.validate()) {
            console.log('register clicked');
            this._userService.register({
                username: this.email,
                email: this.email,
                password: this.password
            }).subscribe(response => {
                
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
        } else if(this.passwordConfirmation == '' || this.passwordConfirmation == undefined) {
            this.errorMessage = 'The Password Confirmation field is required';
            isValid = false;
        } else if(this.passwordConfirmation !== this.password) {
            this.errorMessage = 'The Password Confirmation field must be equal to Password field';
            isValid = false;
        } else {
            this.errorMessage = '';
        }

        return isValid;
    }
}