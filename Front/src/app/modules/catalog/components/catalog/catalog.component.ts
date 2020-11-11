import { Component, Input, OnInit } from '@angular/core';
import { Observable, PartialObserver } from 'rxjs';
import { Store } from "@ngxs/store";
import { AddProductToBasket } from "../../../../shared/actions/basket-action"
import { Product } from './../../../../shared/models/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  @Input() products : Observable<Product[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  addToBasket(product:Product) {
    this.store.dispatch(new AddProductToBasket(product));
  }
}
