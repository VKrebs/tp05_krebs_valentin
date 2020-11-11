import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductsApiService } from '../../../../shared/services/products/productsapi.service';
import { Product } from '../../../../shared/models/product';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  nameFilter : FormControl = new FormControl('');
  maxPrice : FormControl = new FormControl(100);
  products : Observable<Product[]>;
  constructor(private productsApi : ProductsApiService) { }

  ngOnInit(): void {
    this.filterProducts();
  }

  filterProducts()
  {
    this.products = this.productsApi.getProducts().pipe(
      map((items : Product[]) => 
        items.filter((item : Product) => item.name.toLowerCase().includes(this.nameFilter.value.toLowerCase()))
      ),
      map((items : Product[]) =>
        items.filter((item : Product) => item.price <= this.maxPrice.value)
      )
    );
  }

}
