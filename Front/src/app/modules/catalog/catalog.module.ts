import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';

import { ProductsApiService } from './../../shared/services/products/productsapi.service';


@NgModule({
  declarations: [CatalogComponent, SearchbarComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProductsApiService]
})
export class CatalogModule { }
