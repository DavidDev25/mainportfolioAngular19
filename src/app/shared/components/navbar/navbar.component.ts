import { Component, OnInit, OnDestroy } from '@angular/core';
import { SvgService } from '../../../svg.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ScrollService } from '../../services/scroll.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  activeSection = 'home';
  private subscription: Subscription = new Subscription();

  navLinks = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About Me', sectionId: 'about-me' },
    { label: 'Skill', sectionId: 'skills' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Contact', sectionId: 'contact-me' },
  ];

  constructor(
    public svgService: SvgService, 
    public sanitizer: DomSanitizer,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.scrollService.initScrollObserver();
    }, 300);

    this.subscription = this.scrollService.activeSection$.subscribe(section => {
      this.activeSection = section;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
