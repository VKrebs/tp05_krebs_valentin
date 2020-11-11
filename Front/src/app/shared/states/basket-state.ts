import { NgxsModule, Action, Selector, State, StateContext } from "@ngxs/store";
import { BasketStateModel } from "./basket-state-model";
import { AddProductToBasket, RemoveProductFromBasket} from "../actions/basket-action";
import { BasketProduct } from '../models/basket-product';

@State<BasketStateModel>({
    name: "productsInBasket",
    defaults: {
        products: []
    }
})
export class BasketState {
    @Selector()
    static getProductsInBasket(state: BasketStateModel) : BasketProduct[]
    {
        return state.products;
    }

    @Selector()
    static getNbProductsInBasket(state: BasketStateModel) : number
    {
        let total : number = 0;
        state.products.forEach(basketProduct => total += basketProduct.quantity);
        return total;
    }

    @Action(AddProductToBasket)
    add(
        { getState, patchState }: StateContext<BasketStateModel>,
        { payload } : AddProductToBasket
    ) {
        const state = getState();
        
        let added : boolean = false;
        let productsToAdd : BasketProduct[] = state.products;
        productsToAdd.forEach(basketProduct => {
            if (basketProduct.product.id === payload.id)
            {
                basketProduct.quantity++;
                added = true;
                return;
            }
        });
        if (!added)
        {
            productsToAdd.push({product:payload, quantity:1});
        }

        patchState({
            products: [...productsToAdd]
        });
    }

    @Action(RemoveProductFromBasket)
    del (
        { getState, patchState }: StateContext<BasketStateModel>,
        { payload }: RemoveProductFromBasket
    ) {
        const state = getState();
        patchState({
            products: state.products.filter(item => item.product.id != payload.product.id)
        });
    }
}
