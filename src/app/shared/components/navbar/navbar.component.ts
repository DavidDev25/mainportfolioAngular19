import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'AboutMe', path: 'pages/aboutMe' },
    { label: 'Imprint', path: 'pages/Skills' },
    { label: 'Projects', path: 'pages/projects' },
    { label: 'Contact', path: 'pages/contact-me' },
  ];
}
