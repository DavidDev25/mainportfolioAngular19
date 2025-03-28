import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private activeSection = new BehaviorSubject<string>('home');
  activeSection$ = this.activeSection.asObservable();

  constructor(private ngZone: NgZone) {}

  setActiveSection(sectionId: string): void {
    this.ngZone.run(() => {
      this.activeSection.next(sectionId);
    });
  }

  initScrollObserver(): void {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) {
      return;
    }
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80% 0px',
      threshold: [0, 0.1, 0.2, 0.3]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }
}