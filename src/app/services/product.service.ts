import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


const httpOptions = { // Define httpOptions constant here
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private apiUrl = 'http://localhost:3000/products'; 

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProductById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get(url);
  }
  deleteProduct(productId: string): Observable<any> { // Add deleteProduct method
    const url = `http://localhost:3000/products/${productId}`; // Construct URL with product ID
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error from ProductService:', error);
    return throwError(error);
  }
}