import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FavoritesService } from '../favorites.service';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  // styleUrls: ['./product-list.component.css'] // Add styles if needed
})
export class ProductListComponent implements OnInit {
  user: User | null = null;
  isAdmin() {
    return this.user?.role === 'Admin';
  }
  products: any[] = [];
  filteredProducts: any[] = [];
  favorites: any[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private favoritesService: FavoritesService,
    private authenticationService: AuthenticationService,
    
  ) {
    this.authenticationService.user.subscribe(user => {
      this.user = user;
      // this.changeDetectorRef.detectChanges(); // Trigger change detection
    });
   }

  ngOnInit() {
    this.getProducts();
    this.favorites = this.favoritesService.getFavorites(); // Load initial favorites on component load
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data; // Initially show all products
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterByCategory(category: string) {
    this.filteredProducts = this.products.filter(product => product.category === category);
  }

  toggleFavorite(product: any): void {
    const isFavorite = this.isFavorite(product);
    if (isFavorite) {
      this.favoritesService.removeFromFavorites(product);
      // this.favorites = this.favorites.filter(fav => fav !== product); // Update local favorites list (optional)
    } else {
      this.favoritesService.addToFavorites(product);
      // this.favorites.push(product); // Update local favorites list (optional)
    }
  }

  isFavorite(product: any): boolean {
    return this.favorites.includes(product);
  }

  searchApplications() {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter(app =>
        app.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // Reset if search term is empty
    }
  }

  deleteProductById(productId: string): void {
    this.productService.deleteProduct(productId)
      .subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== productId);
          this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId);
          // Display a success message (optional)
          alert('Product Deleted Successfully')
        },
        (error: any) => {
          console.error('Error deleting product:', error);
          // Display an error message (optional)
        }
      );
  }
}
