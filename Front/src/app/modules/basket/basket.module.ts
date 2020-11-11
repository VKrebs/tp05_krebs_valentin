import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './components/basket/basket.component';
import { BasketProductLinePricePipe } from './pipes/basket-product-line-price.pipe';
import { BasketTotalPricePipe } from './pipes/basket-total-price.pipe';


@NgModule({
  declarations: [BasketComponent, BasketProductLinePricePipe, BasketTotalPricePipe],
  imports: [
    CommonModule,
    BasketRoutingModule,
  ]
})
export class BasketModule { }
