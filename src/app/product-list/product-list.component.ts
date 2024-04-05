import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  // styleUrls: ['./product-list.component.css'] // Add styles if needed
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  favorites: any[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private favoritesService: FavoritesService
  ) { }

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
}
