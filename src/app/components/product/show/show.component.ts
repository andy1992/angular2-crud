import { Component, OnInit, NgZone } from '@angular/core';
import ProductService from '../../../services/ProductService';
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
        private zone: NgZone
    ) {
    }

    ngOnInit() {
        this.getProduct();
    }

    getProduct() {
        const id = this.route.snapshot.params['id'];
        this._productService.show(id)
            .subscribe(response => {
                console.log(response);
                if(response != null) {
                    this.product = response;
                }
            });
    }

    back() {
        this.router.navigate(['home']);
    }
}