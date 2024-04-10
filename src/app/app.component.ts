import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from './_services';
import { User } from './_models';

interface Item {
  name: string;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  user: User | null = null;
favorites: any;

  constructor(
    private authenticationService: AuthenticationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.authenticationService.user.subscribe(user => {
      this.user = user;
      this.changeDetectorRef.detectChanges(); // Trigger change detection
    });
    // Initially display all items
    // this.filteredItems = this.items;
  }

  logout() {
    this.authenticationService.logout();
    this.changeDetectorRef.detectChanges(); // Trigger change detection
  }

  isAdmin() {
    return this.user?.role === 'Admin';
  }

  // filterItems(category: string) {
  //   // Filter items based on the selected category
  //   this.filteredItems = this.items.filter(item => item.category === category);
  // }
}

