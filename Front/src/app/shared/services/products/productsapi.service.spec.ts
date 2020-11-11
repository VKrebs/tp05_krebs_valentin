import { TestBed } from '@angular/core/testing';

import { ProductsApiService } from './productsapi.service';

describe('ProductsApiService', () => {
  let service: ProductsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
