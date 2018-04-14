import { Component, OnInit } from '@angular/core';
import AuthService from '../../services/AuthService';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLoggedIn:boolean;
  private user;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {
    this._authService.isLoggedIn.subscribe(value => {
      if(value !== null) {
        this.isLoggedIn = value;
        if(value)
            this.user = this._authService.getUser();
      } else {
          this._authService.isAuthenticated().subscribe(value => {
              this.isLoggedIn = value;
              this.user = this._authService.getUser();
          });
      }
    });
  }

  ngOnInit() {
  }

  logout() {
      this._authService.logout();
      this.router.navigate(['login']);
  }
  
}
