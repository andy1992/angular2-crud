import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import ProductListComponent from './components/product/list/list.component';
import AddProductComponent from './components/product/add/add.component';
import EditProductComponent from './components/product/edit/edit.component';
import ShowProductComponent from './components/product/show/show.component';
import LoginComponent from './components/auth/login.component';
import RegisterComponent from './components/user/register/register.component';
import ChangePasswordComponent from './components/user/change-password/change-password.component';
import ProductService from './services/ProductService';
import AuthService from './services/AuthService';
import UserService from './services/UserService';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    AddProductComponent,
    EditProductComponent,
    ShowProductComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    ProductService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
