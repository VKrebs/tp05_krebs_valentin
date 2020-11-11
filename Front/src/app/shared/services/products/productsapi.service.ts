import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map, mergeAll } from 'rxjs/operators';

import { Product } from '../../models/product';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root', 
})
export class ProductsApiService {

  constructor(private http:HttpClient) { }
  public getProducts () : Observable<Product[]>
  {
    return this.http.get<Product[]>(environment.backendProducts);
  }

  public getProductById (id:number) : Observable<Product>
  {
    return this.http.get<Product[]>(environment.backendProducts).pipe(
      mergeAll(),
      filter ((test : Product) => test.id == id)
    )
  }
}
