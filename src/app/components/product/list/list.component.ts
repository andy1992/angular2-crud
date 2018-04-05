import { Component, OnInit } from '@angular/core';
import ProductService from '../../../services/ProductService';
import Product from '../../../models/Product';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export default class ProductListComponent implements OnInit {
    products: any;

    constructor(
        private _productService: ProductService,
        private router: Router
    ) { }

    ngOnInit() {
        this.get();
    }

    get() {
        const q = "";
        this._productService.list(q)
            .subscribe(employees => {
                this.products = employees
            });
    }

    delete(id) {
        this._productService.delete(id)
            .subscribe((result) => {
                if(result)
                    this.get();
                else
                    console.error('Whoops. Something went wrong.');
            });
    }
}