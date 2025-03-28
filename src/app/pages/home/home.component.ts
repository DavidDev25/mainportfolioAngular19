import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgService } from '../../svg.service';
import { SafeHtml } from '@angular/platform-browser'; 
import { ThemeService } from '../../shared/services/theme.service';

// Interface für Social Links definieren
interface SocialLink {
  name: string;
  url: string;
  iconName?: string;
}

interface DownloadLabel {
  name: string;
  url: string;
}

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private svgService = inject(SvgService);
  protected themeService = inject(ThemeService); 
  
  // Dropdown-Status
  isDownloadDropdownOpen = false;

  title = 'David Werner';
  subtitle = 'Junior Web Developer';
  description = 'Mit Leidenschaft für Frontend-Entwicklung bringe ich digitale Ideen zum Leben';
  profileImage = 'projectImages/profilimage/profilepicture.jpg';

  socialLinks: SocialLink[] = [
    { name: 'Github', url: 'https://github.com/DavidDev25', iconName: 'Github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/david-werner-01a88032a/', iconName: 'LinkedIn' }
  ];
  
  // CV Download Options
  downloadLabels: DownloadLabel[] = [
    { name: 'Lebenslauf PDF', url: 'src\downloads\Lebenslauf_IT_Support.pdf' },
    { name: 'Lebenslauf Word', url: 'src\downloads\Lebenslauf_IT_Support.docx' }
  ];
  
  // Toggle Dropdown
  toggleDownloadDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isDownloadDropdownOpen = !this.isDownloadDropdownOpen;
  }
  
  // SVG Icon Getter
  getSvgIcon(iconName: string): SafeHtml {
    return this.svgService.getSVG(iconName);
  }
  
  // HostListener für Klicks außerhalb des Dropdowns
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownElement = target.closest('.dropdown-container');
    
    if (!dropdownElement && this.isDownloadDropdownOpen) {
      this.isDownloadDropdownOpen = false;
    }
  }
}
