import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  // styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  newProduct: Product = {} as Product; // Initialize an empty product object

  constructor(private productService: ProductService) { }

  ngOnInit(): void { }

  onCreateProduct(product: Product): void { // Receive product from form component
    this.productService.createProduct(product)
      .subscribe(
        (createdProduct) => {
          console.log('Product created:', createdProduct);
          alert('Product created successfully!');
          this.newProduct = {} as Product; // Reset the form
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
  }
}
