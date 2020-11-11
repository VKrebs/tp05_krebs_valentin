import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './components/detail.component';

import { ProductsApiService } from './../../shared/services/products/productsapi.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    HttpClientModule
  ],
  providers: [ProductsApiService]
})
export class DetailModule { }
