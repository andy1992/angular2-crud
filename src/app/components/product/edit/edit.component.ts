import { Component, OnInit } from '@angular/core';
import ProductService from '../../../services/ProductService';
import AuthService from '../../../services/AuthService';
import Product from '../../../models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export default class EditProductComponent implements OnInit {
    
    private productObject: Product;
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
        this.getProduct();
    }

    getProduct() {
        const id = this.route.snapshot.params['id'];
        this._productService.show(id)
            .subscribe(response => {
                if(response != null) {
                    this.productObject = response;
                    this.productName = this.productObject.product_name;
                    this.description = this.productObject.description;
                    this.price = this.productObject.price;
                    this.quantity = this.productObject.quantity;
                }
            });
    }

    editProduct() {
        this._authService.validate();
        if(this.validate()) {
            const product = new Product();
            product.product_id = this.route.snapshot.params['id'];
            product.product_name = this.productName;
            product.description = this.description;
            product.price = this.price;
            product.quantity = this.quantity;

            this._productService.edit(product)
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