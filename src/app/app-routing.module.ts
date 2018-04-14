import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

// Product CRUD Components
import ProductListComponent from './components/product/list/list.component';
import AddProductComponent from './components/product/add/add.component';
import EditProductComponent from './components/product/edit/edit.component';
import ShowProductComponent from './components/product/show/show.component';

// Auth Component
import LoginComponent from './components/auth/login.component';

// User Component
import RegisterComponent from './components/user/register/register.component';
import ChangePasswordComponent from './components/user/change-password/change-password.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ProductListComponent
    },
    {
        path: 'add',
        component: AddProductComponent
    },
    {
        path: 'edit/:id',
        component: EditProductComponent
    },
    {
        path: 'show/:id',
        component: ShowProductComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})

export class AppRoutingModule { }