import { Component, OnInit } from '@angular/core';
import ProductService from '../../../services/ProductService';
import AuthService from '../../../services/AuthService';
import Product from '../../../models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-add-product',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export default class AddProductComponent implements OnInit {
    
    private productName: string;
    private description: string;
    private price: number;
    private quantity: number;

    private productNameError: string;
    private descriptionError: string;
    private priceError: string;
    private quantityError: string;

    constructor(
        private _productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private _authService: AuthService
    ) {
        this.productNameError = '';
        this.descriptionError = '';
        this.priceError = '';
        this.quantityError = '';

        this._authService.validate();
    }

    ngOnInit() {
    }

    addProduct() {
        this._authService.validate();
        if(this.validate()) {
            console.log('Add product clicked');
            const product = new Product();
            product.product_name = this.productName;
            product.description = this.description;
            product.price = this.price;
            product.quantity = this.quantity;

            this._productService.add(product)
                .subscribe(response => {
                    if(!response) {
                        // do something with error message
                        console.error(response);
                    } else {
                        this.back();
                        console.log(response);
                    }
                });
        }
    }

    back() {
        this.router.navigate(['home']);
    }

    validate() {
        let isValid = true;
        if(this.productName == '' || this.productName == undefined) {
            this.productNameError = 'The Product Name field is required';
            isValid = false;
        } else {
            this.productNameError = '';
        }
        
        if(this.description == '' || this.description == undefined) {
            this.descriptionError = 'The Description field is required';
            isValid = false;
        } else {
            this.descriptionError = '';
        }

        if(isNaN(this.price)) {
            this.priceError = 'The Price field must be numeric';
            isValid = false;
        } else {
            this.priceError = '';
        }

        if(isNaN(this.quantity)) {
            this.quantityError = 'The Quantity field must be numeric';
            isValid = false;
        } else {
            this.quantityError = '';
        }

        return isValid;
    }
}