import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from "@ngxs/store";
import { BasketState } from '../../../../shared/states/basket-state';
import { BasketProduct } from '../../../../shared/models/basket-product';
import { RemoveProductFromBasket } from '../../../../shared/actions/basket-action';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  productsList: Observable<BasketProduct[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.productsList = this.store.select(BasketState.getProductsInBasket);
  }

  removeFromBasket(basketProduct:BasketProduct) {
    this.store.dispatch(new RemoveProductFromBasket(basketProduct));
  }

}
