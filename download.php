<?php
// filepath: download.php

// Sicherheitscheck
if (!isset($_GET['file']) || empty($_GET['file'])) {
    header("HTTP/1.0 400 Bad Request");
    exit("Keine Datei angegeben");
}

// Pfad zum Download-Verzeichnis 
$basePath = __DIR__ . '/assets/downloads/';
$file = $_GET['file'];

// Sicherheitscheck gegen Directory Traversal
$file = basename($file); // Nur Dateiname ohne Pfad erlauben

// Vollständiger Pfad
$filePath = $basePath . $file;

// Prüfen ob Datei existiert
if (!file_exists($filePath)) {
    header("HTTP/1.0 404 Not Found");
    exit("Datei nicht gefunden: $filePath");
}

// Dateityp bestimmen
$fileExt = pathinfo($filePath, PATHINFO_EXTENSION);
$contentType = 'application/octet-stream'; // Default

if ($fileExt == 'pdf') {
    $contentType = 'application/pdf';
} else if ($fileExt == 'docx') {
    $contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}

// Download-Header setzen
header('Content-Description: File Transfer');
header('Content-Type: ' . $contentType);
header('Content-Disposition: attachment; filename="' . $file . '"');
header('Content-Length: ' . filesize($filePath));
header('Pragma: public');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Expires: 0');

// Ausgabe-Puffer leeren
ob_clean();
flush();

// Datei ausgeben
readfile($filePath);
exit;
?>