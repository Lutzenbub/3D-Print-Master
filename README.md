
Bedienungsanleitung für 3D-Print Master

Inhaltsverzeichnis
Bedienungsanleitung für 3D-Print Master	3
Einführung	3
Übersicht der Benutzeroberfläche	3
Burger-Menü	3
Schritt-für-Schritt-Anleitung	4
1. Drucker verwalten	4
Parameter eines Druckers	4
Aktionen	4
2. Filamente verwalten	4
Parameter eines Filaments	4
Aktionen	4
3. Modelle verwalten	5
Parameter eines Modells	5
Aktionen	5
4. Stundensätze verwalten	5
Parameter eines Stundensatzes	5
Aktionen	5
5. Strompreise verwalten	6
Parameter eines Strompreises	6
Aktionen	6
6. Kosten berechnen (Hauptseite)	6
Parameter für die Berechnung	6
Aktionen	6
Ergebnisse	7
Erklärung der Berechnungen	7
1. Abschreibungskosten	7
2. Stromkosten	7
3. Filamentkosten	7
4. Arbeitskosten	8
Beispiel:	8
5. Fehldruckaufschlag	8
6. Gesamtkosten	9
Daten speichern und laden	9
Daten speichern	9
Daten laden	9
Tipps	9
Fehlerbehebung	10


Bedienungsanleitung für 3D-Print Master
Einführung
3D-Print Master ist eine Webanwendung, die dir hilft, die Kosten für 3D-Druckprojekte zu berechnen. Sie ermöglicht es dir, Drucker, Filamente, Modelle, Stundensätze und Strompreise zu verwalten, und berechnet basierend auf diesen Daten die Gesamtkosten eines Druckprojekts, einschließlich Abschreibungen, Stromkosten, Filamentkosten, Arbeitskosten und einem Fehldruckaufschlag. Die Anwendung speichert deine Daten lokal im Browser und erlaubt es dir, sie zu exportieren oder wieder zu importieren.
Übersicht der Benutzeroberfläche
Die Anwendung ist in mehrere Seiten unterteilt, die über ein Burger-Menü (☰-Symbol oben links) zugänglich sind:
1.	Hauptseite (Kostenrechner): 
o	Hier gibst du die Parameter für ein Druckprojekt ein und berechnest die Kosten.
2.	Drucker verwalten: 
o	Füge Drucker hinzu, bearbeite sie oder lösche sie.
3.	Filamente verwalten: 
o	Verwalte Filamente (Materialien), die für den Druck verwendet werden.
4.	Modelle verwalten: 
o	Definiere 3D-Modelle mit Druckzeiten, Filamentverbrauch und weiteren Parametern.
5.	Stundensätze verwalten: 
o	Verwalte Stundensätze für Arbeitskosten (z. B. Vorbereitung, Nachbearbeitung, Design).
6.	Strompreise verwalten: 
o	Verwalte Strompreise für die Berechnung der Energiekosten.
Burger-Menü
•	Themenwahl: Wähle zwischen "Hell", "Dunkel" oder "System" (passt sich den Systemeinstellungen an).
•	Daten speichern: Exportiert alle Daten (Drucker, Filamente, Modelle, Stundensätze, Strompreise) als JSON-Datei mit einem Zeitstempel im Format 3D_Print_Master_Data_DD_MM_YYYY_HH_MM.json.
•	Daten laden: Importiert eine zuvor exportierte JSON-Datei. Achtung: Dies überschreibt alle aktuellen Daten, und du wirst vor dem Laden um Bestätigung gebeten.

Schritt-für-Schritt-Anleitung
1. Drucker verwalten
Gehe zu "Drucker verwalten", um 3D Drucker hinzuzufügen, die für deine Projekte verwendet werden.
Parameter eines Druckers
•	Name: Der Name des Druckers (z. B. "Ender 3").
•	Preis (€): Anschaffungskosten des Druckers (z. B. 200 €). Muss ≥ 0 sein.
•	Lebensdauer (Stunden): Geschätzte Lebensdauer des Druckers in Stunden (z. B. 5000 Stunden). Muss > 0 sein.
•	Stromaufnahme (kW): Durchschnittliche Stromaufnahme des Druckers in Kilowatt (z. B. 0,3 kW). Muss zwischen 0,01 und 2 kW liegen.
•	Multicolor-Druck: Aktiviere diese Option, wenn der Drucker mehrere Farben gleichzeitig drucken kann. 
o	Anzahl Farben: Gib die Anzahl der unterstützten Farben an (z. B. 4), wenn Multicolor aktiviert ist.
Aktionen
•	Hinzufügen: Fülle die Felder aus und klicke auf "Hinzufügen", um den Drucker zu speichern.
•	Bearbeiten: Klicke auf "Bearbeiten" neben einem Drucker, ändere die Daten und klicke auf "Speichern".
•	Löschen: Klicke auf "Löschen", um einen Drucker zu entfernen.
2. Filamente verwalten
Gehe zu "Filamente verwalten", um Materialien hinzuzufügen, die für den Druck verwendet werden.
Parameter eines Filaments
•	Name: Name des Filaments (z. B. "PLA Blau").
•	Farbe: Wähle die Farbe des Filaments (z. B. Blau).
•	Metallisch: Wähle, ob das Filament metallisch aussieht ("Silber", "Gold" oder "Keine").
•	Glanz: Wähle, ob das Filament matt oder glänzend ist.
•	Preis (€/kg): Preis pro Kilogramm des Filaments (z. B. 20 €/kg). Muss ≥ 0 sein.
Aktionen
•	Hinzufügen: Fülle die Felder aus und klicke auf "Hinzufügen".
•	Bearbeiten: Klicke auf "Bearbeiten", ändere die Daten und klicke auf "Speichern".
•	Löschen: Klicke auf "Löschen", um ein Filament zu entfernen.
3. Modelle verwalten
Gehe zu "Modelle verwalten", um 3D-Modelle zu definieren, die du drucken möchtest.
Parameter eines Modells
•	Name: Name des Modells (z. B. "Schachfigur").
•	Druckzeit (HH:MM): Zeit, die der Drucker benötigt, um das Modell zu drucken (z. B. 02:30). Muss > 0 sein.
•	Vorbereitungszeit (HH:MM): Zeit für Vorbereitung (z. B. Einrichten des Druckers, 00:15). Kann 0 sein.
•	Nachbearbeitungszeit (HH:MM): Zeit für Nachbearbeitung (z. B. Entfernen von Stützstrukturen, 00:10). Kann 0 sein.
•	Designzeit (HH:MM): Zeit, die für das Design des Modells aufgewendet wurde (z. B. 05:00). Kann 0 sein.
•	Anzahl Verkäufe: Anzahl der Einheiten, die du voraussichtlich verkaufen wirst (z. B. 10). Muss ≥ 1 sein. Die Designzeit wird durch diese Anzahl geteilt, um die Designkosten pro Einheit zu berechnen.
•	Multicolor-Druck: Aktiviere diese Option, wenn das Modell mehrere Farben benötigt. 
o	Anzahl Farben: Gib die Anzahl der Farben an, wenn Multicolor aktiviert ist.
o	Filament pro Farbe: Wähle ein Filament und gib den Verbrauch in Gramm an (z. B. 50 g).
•	Einzelfarben-Druck (wenn Multicolor deaktiviert ist): 
o	Filament: Wähle ein Filament aus.
o	Filamentverbrauch (Gramm): Gib den Verbrauch in Gramm an (z. B. 100 g). Muss > 0 sein.
Aktionen
•	Hinzufügen: Fülle die Felder aus und klicke auf "Hinzufügen".
•	Bearbeiten: Klicke auf "Bearbeiten", ändere die Daten und klicke auf "Speichern".
•	Löschen: Klicke auf "Löschen", um ein Modell zu entfernen.
4. Stundensätze verwalten
Gehe zu "Stundensätze verwalten", um Stundensätze für Arbeitskosten zu definieren.
Parameter eines Stundensatzes
•	Name: Name des Stundensatzes (z. B. "Standardrate").
•	Stundensatz (€/h): Kosten pro Stunde (z. B. 30 €/h). Muss ≥ 0 sein.
Aktionen
•	Hinzufügen: Fülle die Felder aus und klicke auf "Hinzufügen".
•	Bearbeiten: Klicke auf "Bearbeiten", ändere die Daten und klicke auf "Speichern".
•	Löschen: Klicke auf "Löschen", um einen Stundensatz zu entfernen.
5. Strompreise verwalten
Gehe zu "Strompreise verwalten", um Strompreise für die Energiekosten zu definieren.
Parameter eines Strompreises
•	Name: Name des Strompreises (z. B. "Haushaltsstrom").
•	Preis (€/kWh): Preis pro Kilowattstunde (z. B. 0,30 €/kWh). Muss zwischen 0,01 und 1 €/kWh liegen.
Aktionen
•	Hinzufügen: Fülle die Felder aus und klicke auf "Hinzufügen".
•	Bearbeiten: Klicke auf "Bearbeiten", ändere die Daten und klicke auf "Speichern".
•	Löschen: Klicke auf "Löschen", um einen Strompreis zu entfernen.
6. Kosten berechnen (Hauptseite)
Gehe zur Hauptseite, um die Kosten für ein Druckprojekt zu berechnen.
Parameter für die Berechnung
•	Modell: Wähle ein Modell aus (optional). Wenn ein Modell ausgewählt wird, werden die Felder für Druckzeit, Filamentverbrauch, Vorbereitungszeit, Nachbearbeitungszeit und Designzeit automatisch ausgefüllt. Du kannst die Werte manuell anpassen.
•	Drucker: Wähle einen Drucker aus. Pflichtfeld. 
o	Warnung bei Multicolor: Wenn das Modell Multicolor ist, aber der Drucker dies nicht unterstützt oder nicht genug Farben hat, erscheint eine Warnung.
•	Druckzeit (HH:MM): Zeit, die der Drucker benötigt (z. B. 02:30). Muss > 0 sein.
•	Filamentverbrauch: 
o	Einzelfarben-Druck: Wähle ein Filament und gib den Verbrauch in Gramm an (z. B. 100 g). Muss > 0 sein.
o	Multicolor-Druck (wenn das Modell Multicolor ist): Gib für jede Farbe ein Filament und den Verbrauch an.
•	Vorbereitungszeit (HH:MM): Zeit für Vorbereitung (z. B. 00:15). Kann 0 sein.
•	Nachbearbeitungszeit (HH:MM): Zeit für Nachbearbeitung (z. B. 00:10). Kann 0 sein.
•	Designzeit (HH:MM): Designzeit pro Einheit (z. B. 00:30). Kann 0 sein.
•	Stundensatz: Wähle einen Stundensatz aus oder gib einen Wert manuell ein (z. B. 30 €/h). Kann 0 sein.
•	Strompreis: Wähle einen Strompreis aus oder gib einen Wert manuell ein (z. B. 0,30 €/kWh). Kann 0 sein.
•	Fehldruckrate (%): Prozentsatz, der für Fehldrucke auf die Gesamtkosten aufgeschlagen wird (z. B. 10 %). Standardwert: 10 %. Kann 0 sein.
Aktionen
•	Berechnen: Klicke auf "Berechnen", um die Kosten zu ermitteln.
•	Zurücksetzen: Klicke auf "Zurücksetzen", um das Formular zu leeren.
Ergebnisse
Nach dem Klicken auf "Berechnen" werden die Kosten aufgeschlüsselt angezeigt:
•	Abschreibung: Kosten für die Abschreibung des Druckers.
•	Stromkosten: Energiekosten für den Druck.
•	Filamentkosten: Kosten für das verwendete Filament.
•	Arbeitskosten: Kosten für Vorbereitung, Nachbearbeitung und Design.
•	Fehldruckaufschlag: Aufschlag für Fehldrucke.
•	Gesamtkosten: Summe aller Kosten.
Erklärung der Berechnungen
Die Gesamtkosten eines Druckprojekts werden wie folgt berechnet:
1. Abschreibungskosten
Die Abschreibungskosten des Druckers werden basierend auf seiner Lebensdauer berechnet:
Abschreibungskosten=(Druckerpreis (€)Lebensdauer (Stunden))×Druckzeit (Stunden)\text{Abschreibungskosten} = \left( \frac{\text{Druckerpreis (€)}}{\text{Lebensdauer (Stunden)}} \right) \times \text{Druckzeit (Stunden)}Abschreibungskosten=(Lebensdauer (Stunden)Druckerpreis (€))×Druckzeit (Stunden) 
Beispiel:
•	Druckerpreis: 200 €, Lebensdauer: 5000 Stunden, Druckzeit: 2,5 Stunden
•	Abschreibungskosten = 2005000×2,5=0,04×2,5=0,10 \frac{200}{5000} \times 2,5 = 0,04 \times 2,5 = 0,10 5000200×2,5=0,04×2,5=0,10 €
2. Stromkosten
Die Stromkosten basieren auf der Stromaufnahme des Druckers und dem Strompreis:
Stromkosten=Stromaufnahme (kW)×Druckzeit (Stunden)×Strompreis (€/kWh)\text{Stromkosten} = \text{Stromaufnahme (kW)} \times \text{Druckzeit (Stunden)} \times \text{Strompreis (€/kWh)}Stromkosten=Stromaufnahme (kW)×Druckzeit (Stunden)×Strompreis (€/kWh) 
Beispiel:
•	Stromaufnahme: 0,3 kW, Druckzeit: 2,5 Stunden, Strompreis: 0,30 €/kWh
•	Stromkosten = 0,3×2,5×0,30=0,225 0,3 \times 2,5 \times 0,30 = 0,225 0,3×2,5×0,30=0,225 €
3. Filamentkosten
Die Filamentkosten hängen vom Verbrauch und dem Preis des Filaments ab:
Filamentkosten=(Filamentverbrauch (Gramm)1000)×Filamentpreis (€/kg)\text{Filamentkosten} = \left( \frac{\text{Filamentverbrauch (Gramm)}}{1000} \right) \times \text{Filamentpreis (€/kg)}Filamentkosten=(1000Filamentverbrauch (Gramm))×Filamentpreis (€/kg) 
Für Multicolor-Modelle wird dies für jedes Filament berechnet und summiert. Beispiel:
•	Filamentverbrauch: 100 g, Filamentpreis: 20 €/kg
•	Filamentkosten = 1001000×20=0,1×20=2,00 \frac{100}{1000} \times 20 = 0,1 \times 20 = 2,00 1000100×20=0,1×20=2,00 €
4. Arbeitskosten
Die Arbeitskosten umfassen Vorbereitung, Nachbearbeitung und Design:
Arbeitskosten=(Vorbereitungszeit (Stunden)+Nachbearbeitungszeit (Stunden)+Designzeit (Stunden))×Stundensatz (€/h)\text{Arbeitskosten} = (\text{Vorbereitungszeit (Stunden)} + \text{Nachbearbeitungszeit (Stunden)} + \text{Designzeit (Stunden)}) \times \text{Stundensatz (€/h)}Arbeitskosten=(Vorbereitungszeit (Stunden)+Nachbearbeitungszeit (Stunden)+Designzeit (Stunden))×Stundensatz (€/h) 
Beispiel:
•	Vorbereitungszeit: 0,25 Stunden, Nachbearbeitungszeit: 0,1667 Stunden (10 Minuten), Designzeit: 0,5 Stunden, Stundensatz: 30 €/h
•	Arbeitskosten = (0,25+0,1667+0,5)×30=0,9167×30=27,50 (0,25 + 0,1667 + 0,5) \times 30 = 0,9167 \times 30 = 27,50 (0,25+0,1667+0,5)×30=0,9167×30=27,50 €
5. Fehldruckaufschlag
Der Fehldruckaufschlag wird auf die Zwischensumme (ohne Fehldruckaufschlag) angewendet:
Zwischensumme=Abschreibungskosten+Stromkosten+Filamentkosten+Arbeitskosten\text{Zwischensumme} = \text{Abschreibungskosten} + \text{Stromkosten} + \text{Filamentkosten} + \text{Arbeitskosten}Zwischensumme=Abschreibungskosten+Stromkosten+Filamentkosten+Arbeitskosten Fehldruckaufschlag=Zwischensumme×(Fehldruckrate (%)100)\text{Fehldruckaufschlag} = \text{Zwischensumme} \times \left( \frac{\text{Fehldruckrate (\%)}}{100} \right)Fehldruckaufschlag=Zwischensumme×(100Fehldruckrate (%)) 
Beispiel:
•	Zwischensumme: 29,825 € (0,10 + 0,225 + 2,00 + 27,50), Fehldruckrate: 10 %
•	Fehldruckaufschlag = 29,825×10100=2,9825 29,825 \times \frac{10}{100} = 2,9825 29,825×10010=2,9825 €


6. Gesamtkosten
Die Gesamtkosten sind die Summe aller Kosten:
Gesamtkosten=Zwischensumme+Fehldruckaufschlag\text{Gesamtkosten} = \text{Zwischensumme} + \text{Fehldruckaufschlag}Gesamtkosten=Zwischensumme+Fehldruckaufschlag 
Beispiel:
•	Zwischensumme: 29,825 €, Fehldruckaufschlag: 2,9825 €
•	Gesamtkosten = 29,825+2,9825=32,8075≈32,81 29,825 + 2,9825 = 32,8075 \approx 32,81 29,825+2,9825=32,8075≈32,81 €
Daten speichern und laden
Daten speichern
1.	Öffne das Burger-Menü und klicke auf "Daten speichern".
2.	Eine JSON-Datei mit dem Namen 3D_Print_Master_Data_DD_MM_YYYY_HH_MM.json wird heruntergeladen.
3.	Speichere die Datei an einem sicheren Ort, um deine Daten zu sichern.
Daten laden
1.	Öffne das Burger-Menü und wähle "Daten laden".
2.	Wähle eine zuvor gespeicherte JSON-Datei aus.
3.	Bestätigung: Du wirst gefragt: "Achtung: Das Laden einer Datei wird alle aktuellen Daten überschreiben. Möchten Sie fortfahren?" 
o	Klicke "OK", um fortzufahren, oder "Abbrechen", um abzubrechen.
4.	Nach dem Laden erscheint die Meldung "Daten erfolgreich geladen!", und die Listen werden aktualisiert.
Tipps
•	Sicherung: Speichere regelmäßig deine Daten, um sie nicht zu verlieren.
•	Modelle verwenden: Nutze die Modellverwaltung, um häufig gedruckte Modelle zu speichern und Zeit bei der Eingabe zu sparen.
•	Multicolor-Kompatibilität: Stelle sicher, dass dein Drucker die Anforderungen eines Multicolor-Modells erfüllt, um Warnungen zu vermeiden.
•	Fehldruckrate anpassen: Passe die Fehldruckrate an deine Erfahrungswerte an, um realistischere Kosten zu erhalten.


Fehlerbehebung
•	Warnung bei Multicolor: Überprüfe, ob der Drucker Multicolor unterstützt und genug Farben hat.
•	Fehler beim Laden: Stelle sicher, dass die JSON-Datei das korrekte Format hat (z. B. eine zuvor exportierte Datei).
•	Ungültige Eingaben: Achte auf die Eingabebeschränkungen (z. B. Druckzeit > 0, Stromaufnahme zwischen 0,01 und 2 kW).
________________________________________
Das ist die vollständige Bedienungsanleitung für deine 3D Print Master. Sie deckt alle Funktionen ab, erklärt die Parameter und Berechnungen detailliert und bietet praktische Tipps.

