import { Injectable, inject, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  // Modern Angular DI mit inject()
  private http = inject(HttpClient);
  
  // Umgebungscheck mit isDevMode()
  private isProduction = !isDevMode();
  
  constructor() { }

  /**
   * Lädt eine Datei herunter, wählt automatisch die passende Methode
   */
  downloadFile(fileName: string, localPath: string): void {
    if (this.isProduction) {
      this.serverDownload(fileName);
    } else {
      this.localDownload(localPath, fileName);
    }
  }

  /**
   * Bestimmt den Content-Type basierend auf der Dateiendung
   */
  private getContentType(fileName: string): string {
    if (fileName.endsWith('.pdf')) {
      return 'application/pdf';
    } else if (fileName.endsWith('.docx')) {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    return 'application/octet-stream'; // Default
  }

  /**
   * Lokaler Download mit HttpClient (moderner als XMLHttpRequest)
   */
  private localDownload(url: string, fileName: string): void {
    console.log(`Starting local download for ${fileName} from ${url}`);
    const contentType = this.getContentType(fileName);

    // HTTP GET mit responseType 'blob'
    this.http.get(url, { responseType: 'blob' })
      .pipe(
        map(response => {
          return new Blob([response], { type: contentType });
        }),
        catchError(error => {
          console.error(`Error downloading file: ${error.message}`);
          alert(`Download fehlgeschlagen: ${error.status ? `HTTP error ${error.status}` : 'Netzwerkfehler'}`);
          return of(null); // Leere Observable zurückgeben bei Fehler
        })
      )
      .subscribe(blob => {
        if (!blob) return; // Falls ein Fehler aufgetreten ist
        
        // Browser-DownloadAPI verwenden
        this.triggerBrowserDownload(blob, fileName);
      });
  }

  /**
   * Löst den Download im Browser aus
   */
  private triggerBrowserDownload(blob: Blob, fileName: string): void {
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    
    // Unsichtbarer Link
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Download auslösen
    link.click();
    
    // Aufräumen nach kurzer Verzögerung
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    }, 100);
    
    console.log(`Download for ${fileName} initiated`);
  }

  /**
   * Server-Download über PHP
   */
  private serverDownload(fileName: string): void {
    console.log(`Starting server download for ${fileName}`);
    
    // URL zum PHP-Skript
    const downloadUrl = `/download.php?file=${encodeURIComponent(fileName)}`;
    
    // Mit einem unsichtbaren Link herunterladen
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Aufräumen
    setTimeout(() => document.body.removeChild(link), 100);
  }
}