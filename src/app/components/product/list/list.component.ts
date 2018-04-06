import { Component, OnInit, NgZone } from '@angular/core';
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
    currentPage: number;
    totalPages: any;
    totalProducts: number;
    itemPerPage: number;
    from: number;
    to: number;
    pages: any;
    prevPage: number;
    nextPage: number;
    orderType: string;
    tempOrderType: string;
    orderBy: string;
    searchQuery: string;

    constructor(
        private _productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private zone: NgZone
    ) {
        this.route.queryParams.subscribe((params: Params) => {
            const orderBy = params['order_by'];
            const orderType = params['order_type'];
            const page = params['page'];
            const searchQuery = params['q'];

            if(page != undefined && page != null)
                this.currentPage = parseInt(page);
            else
                this.currentPage = 1;

            if(searchQuery != undefined && searchQuery != null)
                this.searchQuery = searchQuery;
            else
                this.searchQuery = '';
            
            if(orderBy != undefined && orderBy != null && orderType != undefined && orderType != null) {
                this.orderBy = orderBy;
                this.tempOrderType = orderType;
                // Update order Type in the grid
                this.orderType = (orderType == 'desc') ? 'asc' : 'desc';
            } else {
                this.orderBy = 'product_id';
                this.orderType = 'desc';
            }
            this.get();
        });
    }

    ngOnInit() {
    }

    get() {
        this.itemPerPage = 10;
        this.pages = [];
        this._productService.paginate(this.searchQuery, this.currentPage, this.itemPerPage, this.orderBy, this.tempOrderType)
            .subscribe(products => {
                this.products = products;
            });
            
        this._productService.count(this.searchQuery)
            .subscribe(count => {
                this.totalProducts = count;
                this.totalPages = Math.ceil(count / this.itemPerPage);
                this.from = ((this.currentPage - 1) * this.itemPerPage) + 1;
                this.to = this.currentPage * this.itemPerPage;
                if(this.to > count)
                    this.to = count;
                for(let i = 1 ; i <= this.totalPages ; i++) {
                    this.pages.push(i);
                }
                this.prevPage = (this.currentPage > 1) ? (this.currentPage - 1) : 1;
                this.nextPage = (this.currentPage < this.totalPages) ? (this.currentPage + 1) : this.totalPages;
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

    search() {
        this.router.navigate(['home'], {
            queryParams: {
                q: this.searchQuery
            }
        });
    }
}