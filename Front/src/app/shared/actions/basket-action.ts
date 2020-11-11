import { Product } from "../models/product";
import { BasketProduct } from "../models/basket-product";

export class AddProductToBasket {
    static readonly type = "[Product] Add";
    constructor (public payload: Product) {}
}

export class RemoveProductFromBasket {
    static readonly type = "[Product] Del";
    constructor (public payload: BasketProduct) {}
}
