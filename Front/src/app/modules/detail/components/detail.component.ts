import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from "@ngxs/store";
import { AddProductToBasket } from "../../../shared/actions/basket-action"

import { Product } from "../../../shared/models/product";
import { ProductsApiService } from "../../../shared/services/products/productsapi.service"

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  product$:Observable<Product>;

  constructor(private route: ActivatedRoute, private productApiService:ProductsApiService, private store: Store) { }

  ngOnInit(): void {
    let id:number = parseInt(this.route.snapshot.paramMap.get('id'),10);
    console.log(id)
    this.product$ = this.productApiService.getProductById(id);
    console.log(this.product$);
  }

  addToBasket(product:Product) {
    console.log(product);
    this.store.dispatch(new AddProductToBasket(product));
  }
}
