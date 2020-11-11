import { Pipe, PipeTransform } from '@angular/core';
import { BasketProduct } from '../../../shared/models/basket-product';

@Pipe({
  name: 'basketProductLinePrice'
})
export class BasketProductLinePricePipe implements PipeTransform {
  transform(value: BasketProduct): number {
    return value.product.price * value.quantity;
  };
}
