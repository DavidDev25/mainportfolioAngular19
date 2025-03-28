import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export type ThemeType = 'blue-gradient' | 'dark-gradient';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal erstellen (reaktiver Wert mit Initialwert 'blue-gradient')
  private themeSignal = signal<ThemeType>('blue-gradient');
  
  // Observable für Kompatibilität mit älteren RxJS-Komponenten
  readonly theme$ = toObservable(this.themeSignal);
  
  // Getter für einfachen Zugriff im Template
  get currentTheme() {
    return this.themeSignal();  // () ist notwendig, um den aktuellen Wert abzurufen
  }
  
  // Theme umschalten
  toggleTheme() {
    this.themeSignal.update(current => 
      current === 'blue-gradient' ? 'dark-gradient' : 'blue-gradient');
  }
  
  // Theme direkt setzen
  setTheme(theme: ThemeType) {
    this.themeSignal.set(theme);
  }
  
  // Hilfsmethode zur Verwendung in Templates
  isDarkTheme() {
    return this.currentTheme === 'dark-gradient';
  }
}