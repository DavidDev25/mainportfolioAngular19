# Portfolio Website

> Ein modernes, responsives Portfolio mit Angular 19

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## Moderne Angular-Konzepte

Dieses Portfolio demonstriert mehrere hochmoderne Angular 19-Features und -Konzepte:

### Kernfunktionen von Angular 19

- **Standalone Components**: Alle Komponenten sind als Standalone konfiguriert, was die Notwendigkeit von NgModules beseitigt
- **Signal-basiertes State Management**: Reaktive Zustandsverwaltung mit Angulars Signal API
- **Moderner Control Flow**: Verwendung von `@if` und `@for` anstelle der traditionellen `*ngIf` und `*ngFor` Direktiven
- **Funktionale Dependency Injection**: Moderne `inject()`-Funktion statt Constructor-Injektion

### Fortgeschrittene Implementierungsdetails

- **Automatisches Subscription-Management**: Verwendung von `takeUntilDestroyed()` um Memory Leaks zu vermeiden
- **Dynamisches Theming-System**: Vollständige Light/Dark-Theme-Implementierung mit sanften Übergängen
- **Reaktive Programmierung**: Observable-Streams für Scroll-Position-Tracking
- **Sichere SVG-Handhabung**: Dynamische SVG-Injektion mit Sicherheitsberücksichtigung

## Projektstruktur

Die Anwendung folgt einer Feature-basierten Organisation:

src/ ├── app/ │ ├── pages/ # Hauptkomponenten für Features │ │ ├── home/ │ │ ├── about-me/ │ │ ├── skills/ │ │ ├── projects/ │ │ └── contact-me/ │ ├── shared/ # Geteilte Komponenten und Services │ │ ├── components/ │ │ │ └── navbar/
│ │ └── services/ │ │ ├── scroll.service.ts │ │ └── theme.service.ts │ ├── svg.service.ts # SVG-Handling-Service │ ├── app.component.ts # Root-Komponente mit Theme-Switching │ └── app.routes.ts # Anwendungsrouting └── styles.scss # Globale Stile und Theme-Definitionen

## Zentrale technische Implementierungen

### Theme-Wechsel mit Signals

```typescript
export class ThemeService {
  private themeSignal = signal<ThemeType>('blue-gradient');
  
  get currentTheme() {
    return this.themeSignal();
  }
  
  toggleTheme() {
    this.themeSignal.update(current => 
      current === 'blue-gradient' ? 'dark-gradient' : 'blue-gradient');
  }
  
  isDarkTheme() {
    return this.currentTheme === 'dark-gradient';
  }
}
```

### Navbar-Komponente

```typescript
export class NavbarComponent {
  private scrollService = inject(ScrollService);
  public svgService = inject(SvgService);
  protected themeService = inject(ThemeService);
    
  // Komponenten-Logik...
}

@for (link of navLinks; track link.sectionId) {
  <div class="navWrapper">
    @if (link.label.toLowerCase() === 'contact') {
      <a class="contact-button">Contact Me</a>
    } @else {
      <a>{{link.label}}</a>
    }
  </div>
}
```
Entwicklung
Voraussetzungen
Node.js (v18+)
npm/yarn


#Setup
# Repository klonen
git clone https://github.com/yourusername/portfolio.git

# Abhängigkeiten installieren
cd portfolio
npm install

# Entwicklungsserver starten
npm start

Besuche http://localhost:4200/, um die Anwendung in Aktion zu sehen

Lizenz
MIT

Folge diesen Schritten, um die Datei zu ersetzen:

1. Kopiere den gesamten Code-Block oben
2. Öffne Visual Studio Code
3. Navigiere zum Hauptverzeichnis deines Projekts (`dein Pfad des Projektes`)
4. Falls bereits eine README.md existiert, öffne diese und ersetze den gesamten Inhalt durch den kopierten Text
5. Falls keine README.md existiert, erstelle eine neue Datei mit dem Namen "README.md" und füge den Text ein
6. Speichere die Datei

