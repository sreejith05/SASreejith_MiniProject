import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: any[] = [];

  addToFavorites(app: any): void {
    // Check if the app is already in favorites
    if (!this.favorites.includes(app)) {
      this.favorites.push(app);
      console.log('App added to favorites:', app);
    } else {
      console.log('App already exists in favorites:', app);
    }
  }

  removeFromFavorites(app: any): void {
    const index = this.favorites.indexOf(app);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      console.log('App removed from favorites:', app);
    } else {
      console.log('App not found in favorites:', app);
    }
  }

  getFavorites(): any[] {
    return this.favorites;
  }
}
