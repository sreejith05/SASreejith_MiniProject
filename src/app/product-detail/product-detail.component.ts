import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    // const productId = this.route.snapshot.paramMap.get('id');
    const productId = this.route.snapshot.paramMap.get('id');
  console.log('Product ID:', productId);
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data) => {
          this.product = data;
          console.log('Product data:', data);
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    } else {
      // Handle the case when productId is null or undefined
      console.error('Product ID not found in the URL');
    }
  }
}