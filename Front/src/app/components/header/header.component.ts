import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from "@ngxs/store";
import { BasketState } from "../../shared/states/basket-state";
import { UserState } from 'src/app/shared/states/user-state';
import { User } from 'src/app/shared/models/user';
import { DisconnectUser } from 'src/app/shared/actions/user-actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nbItemsInBasket: Observable<number>;
  isConnected: Observable<boolean>;
  login: Observable<User>;

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.nbItemsInBasket = this.store.select(BasketState.getNbProductsInBasket);
    this.login = this.store.select(UserState.getUser);
    this.isConnected = this.store.select(UserState.isConnected);
  }

  disconnect()
  {
    this.store.dispatch(new DisconnectUser());
  }
}
