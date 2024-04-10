import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../_models/product';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(product: Product) {
    return this.http.post<Product>('http://localhost:3000/products', product); // Replace with your JSON server endpoint
  }

}
