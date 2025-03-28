import { Component, inject } from '@angular/core';
import { SvgService } from '../../svg.service';
import { SafeHtml } from '@angular/platform-browser'; 

// Interface für Social Links definieren
interface SocialLink {
  name: string;
  url: string;
  iconName?: string;
}

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private svgService = inject(SvgService);

  title = 'David Werner';
  subtitle = 'Junior Web Developer';
  description = 'Mit Leidenschaft für Frontend-Entwicklung bringe ich digitale Ideen zum Leben';
  profileImage = 'projectImages/profilimage/profilepicture.jpg';

  socialLinks: SocialLink[] = [
    { name: 'Github', url: 'https://github.com/DavidDev25', iconName: 'Github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/david-werner-01a88032a/', iconName: 'LinkedIn' }
  ];
  

  getSvgIcon(iconName: string): SafeHtml {
    return this.svgService.getSVG(iconName);
  }
}
