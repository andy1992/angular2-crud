import { Component, OnInit } from '@angular/core';
import ProductService from '../../../services/ProductService';
import AuthService from '../../../services/AuthService';
import Product from '../../../models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-show-product',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.css']
})
export default class ShowProductComponent implements OnInit {
    
    private product: Product;

    constructor(
        private _productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private _authService: AuthService
    ) {
        this._authService.validate();
    }

    ngOnInit() {
        this.getProduct();
    }

    getProduct() {
        const id = this.route.snapshot.params['id'];
        this._productService.show(id)
            .subscribe(response => {
                if(response != null) {
                    this.product = response;
                }
            });
    }

    back() {
        this.router.navigate(['home']);
    }
}