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

  // Download-Funktion
  downloadFile(event: Event, url: string, fileName: string): void {
    event.preventDefault();
    event.stopPropagation();
    
    console.log(`Starting download for ${fileName} from ${url}`);

    // Content-Type basierend auf Dateiendung bestimmen
    let contentType = 'application/octet-stream'; // Default
    if (fileName.endsWith('.pdf')) {
      contentType = 'application/pdf';
    } else if (fileName.endsWith('.docx')) {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    
    // XMLHttpRequest verwenden für binäre Daten
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
      if (this.status === 200) {
        console.log(`File ${fileName} fetched successfully`);
        
        // Direktes Verwenden des Response-Blob mit dem richtigen Content-Type
        const blob = new Blob([this.response], { type: contentType });
        
        // Browser-DownloadAPI verwenden
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        
        // Link zum DOM hinzufügen und klicken
        document.body.appendChild(link);
        link.click();
        
        // Aufräumen
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
        }, 500);
        
        console.log(`Download for ${fileName} initiated`);
      } else {
        console.error(`Error ${this.status} while fetching ${url}`);
        alert(`Download fehlgeschlagen: HTTP error ${this.status}`);
      }
    };
    
    xhr.onerror = function() {
      console.error(`Network error while fetching ${url}`);
      alert('Download fehlgeschlagen: Netzwerkfehler');
    };
    
    xhr.send();
    
    // Dropdown nach dem Download schließen
    this.isDownloadDropdownOpen = false;
  }
}
