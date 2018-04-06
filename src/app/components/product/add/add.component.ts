import { Component, OnInit, NgZone } from '@angular/core';
import ProductService from '../../../services/ProductService';
import Product from '../../../models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-add-product',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export default class AddProductComponent implements OnInit {
    
    constructor(
        private _productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private zone: NgZone
    ) {
    }

    ngOnInit() {
        console.log('Add product initialized');
    }

    addProduct() {
        console.log('Add product clicked');
    }

    back() {
        this.router.navigate(['home']);
    }
}