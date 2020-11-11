import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
  { path: 'catalog', loadChildren: () => import('./modules/catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'basket', loadChildren: () => import('./modules/basket/basket.module').then(m => m.BasketModule) },
  { path: 'detail/:id', loadChildren: () => import('./modules/detail/detail.module').then(m => m.DetailModule) },
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
  { path: 'login', loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'home', component:HomeComponent },
  { path: '', component:HomeComponent },
  { path: '**', redirectTo:'home'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
