import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent
  ],
  template: `
    <div [ngClass]="currentTheme">
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
    </div>
    

    <button (click)="toggleTheme()" class="theme-toggle">
      Theme wechseln
    </button>
  `
})
export class AppComponent {
  title = 'Portfolio';
  currentTheme = 'blue-gradient'; 

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'blue-gradient' 
      ? 'dark-gradient' 
      : 'blue-gradient';
  }
}
