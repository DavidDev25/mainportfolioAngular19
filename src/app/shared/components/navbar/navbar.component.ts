import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgService } from '../../../svg.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public svgService: SvgService, public sanitizer: DomSanitizer) {}

  navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'AboutMe', path: 'pages/aboutMe' },
    { label: 'Imprint', path: 'pages/Skills' },
    { label: 'Projects', path: 'pages/projects' },
    { label: 'Contact', path: 'pages/contact-me' },
  ];
}
