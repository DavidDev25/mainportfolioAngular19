import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../../svg.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ScrollService } from '../../services/scroll.service';
import { ThemeService } from '../../services/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  // Moderne Dependency Injection mit inject()
  private scrollService = inject(ScrollService);
  public svgService = inject(SvgService);
  public sanitizer = inject(DomSanitizer);
  protected themeService = inject(ThemeService);
  
  activeSection = 'home';

  navLinks = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About Me', sectionId: 'about-me' },
    { label: 'Skill', sectionId: 'skills' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Contact', sectionId: 'contact-me' },
  ];

  constructor() {
    // Verbesserte Subscription-Verwaltung mit takeUntilDestroyed
    this.scrollService.activeSection$
      .pipe(takeUntilDestroyed())
      .subscribe(section => {
        this.activeSection = section;
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.scrollService.initScrollObserver();
    }, 500);
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
