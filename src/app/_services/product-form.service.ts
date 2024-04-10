import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../_models/product'; // Import the product model

// Import FormsModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: '../product-form/product-form.component.html',
  // styleUrls: ['./product-form.component.css'] // Optional, if needed
})
export class ProductFormComponent {
  @Input() product: Product = {} as Product; // Receive product object via input
  @Output() createProduct = new EventEmitter<Product>(); // Emit product on creation

  onSubmit(): void {
    this.createProduct.emit(this.product); // Emit the product object
  }
}
