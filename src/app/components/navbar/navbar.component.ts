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

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {
    this._authService.isLoggedIn.subscribe(value => {
      if(value !== null) {
        this.isLoggedIn = value;
      } else {
          this._authService.isAuthenticated().subscribe(value => {
              this.isLoggedIn = value;
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
