import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Product from '../models/Product';
import AuthService from '../services/AuthService';

@Injectable()
export default class ProductService {

    constructor (
        private _http: Http,
        private router: Router,
        private _authService: AuthService
    ) { }

    count (productName) {
        let url = environment.apiBaseUrl + '/product/count?api_token=' + localStorage.getItem('api_token');
        if(productName !== "") {
            url = url + '?q=' + productName;
        }
        return this._http.get(url)
            .map(response => {
                return response.json();
            });
    }

    list (productName) {
        let url = environment.apiBaseUrl + '/products?api_token=' + localStorage.getItem('api_token');

        if(productName !== "") {
            url = url + '?q=' + environment.apiBaseUrl;
        }
        return this._http.get(url)
            .map(response => {
                return response.json();
            });
    }

    paginate (productName, page = 1, itemPerPage = 10, orderBy = 'product_id', orderType = 'desc') {
        let url = environment.apiBaseUrl + '/products/paginate/' + page + '/' + itemPerPage + '?order_by=' + orderBy + '&order_type=' + orderType + '&api_token=' + localStorage.getItem('api_token');

        if(productName !== "") {
            url = url + '&q=' + productName;
        }

        return this._http.get(url)
            .map(response => {
                return response.json();
            });
    }

    show (id) {
        return this._http.get(environment.apiBaseUrl + '/products/' + id + '?api_token=' + localStorage.getItem('api_token'))
            .map(response => {
                const returnedObject = response.json().data;
                return returnedObject;
            });
    }

    add(product) {
        return this._http.post(environment.apiBaseUrl + '/products?api_token=' + localStorage.getItem('api_token'), product)
            .map((newProduct) => {
                const returnedObject = newProduct.json().data;
                return returnedObject.product_id;
            });
    }

    edit(product) {
        return this._http.put(environment.apiBaseUrl + '/products/' + product.product_id + '?api_token=' + localStorage.getItem('api_token'), product)
            .map((newProduct) => {
                const returnedObject = newProduct.json().data;
                return returnedObject.product_id;
            });
    }

    delete(id) {
        return this._http.delete(environment.apiBaseUrl + '/products/' + id + '?api_token=' + localStorage.getItem('api_token'))
            .map((result) => {
                const message = result.json().message;
                const returnedObject = result.json().data;
                return returnedObject;
            });
    }
}