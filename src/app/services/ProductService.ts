import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import Product from '../models/Product';

@Injectable()
export default class ProductService {

    constructor (private _http: Http) { }

    count (productName) {
        let url = environment.apiBaseUrl + '/product/count';
        if(productName !== "") {
            url = url + '?q=' + productName;
        }
        return this._http.get(url)
            .map(response => {
                return response.json();
            });
    }

    list (productName) {
        let url = environment.apiBaseUrl + '/products';

        if(productName !== "") {
            url = url + '?q=' + environment.apiBaseUrl;
        }
        return this._http.get(url)
            .map(response => {
                return response.json();
            });
    }

    paginate (productName, page = 1, itemPerPage = 10, orderBy = 'product_id', orderType = 'desc') {
        let url = environment.apiBaseUrl + '/products/paginate/' + page + '/' + itemPerPage + '?order_by=' + orderBy + '&order_type=' + orderType;

        if(productName !== "") {
            url = url + '&q=' + productName;
        }

        return this._http.get(url)
            .map(response => {
                return response.json();
            });
    }

    show (id) {
        return this._http.get(environment.apiBaseUrl + '/' + id)
            .map(response => {
                return response.json();
            });
    }

    add(product) {
        return this._http.post(environment.apiBaseUrl + '/products', product)
            .map((newProduct) => {
                return newProduct.json().productId;
            });
    }

    edit(product) {
        return this._http.put(environment.apiBaseUrl + '/products/' + product.productId, product)
            .map((newProduct) => {
                return newProduct.json().productId;
            });
    }

    delete(id) {
        return this._http.delete(environment.apiBaseUrl + '/products/' + id)
            .map((result) => {
                return result;
            });
    }
}