import { Pipe, PipeTransform } from '@angular/core';
import { BasketProduct } from '../../../shared/models/basket-product';

@Pipe({
  name: 'basketTotalPrice'
})
export class BasketTotalPricePipe implements PipeTransform {

  transform(values: BasketProduct[][]): number {
    let total:number = 0;
    values.forEach(basketProducts => {
      basketProducts.forEach(basketProduct => {
        total += basketProduct.product.price * basketProduct.quantity;
      });
    });
    return total;
  };
}
