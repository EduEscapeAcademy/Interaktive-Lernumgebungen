# Ruta por España – Kurzanleitung

## 1. Für Schülerinnen und Schüler

1. Öffne immer dieselbe Startseite.
2. Beim ersten Mal gibst du nur deinen Anzeigenamen ein: normalerweise deinen Vornamen, bei doppelten Vornamen zusätzlich die Initiale des Nachnamens (zum Beispiel `Melanie T.`).
3. Gib den Code ein, den die Lehrkraft nennt. Leerzeichen, Bindestriche sowie Groß- und Kleinschreibung spielen keine Rolle.
4. Bearbeite die Blöcke nacheinander. Erst mit **Antwort prüfen** wird eine Antwort verbindlich gespeichert.
5. Nach einem Fehler bekommst du zuerst einen kleinen, dann einen deutlicheren Hinweis. Beim dritten Fehlversuch siehst du die Lösung und kannst weiterarbeiten.
6. Frühere offene Starter blockieren den heutigen Starter nicht. Du findest sie später unter **Offene Starter nachholen**.
7. Dein Fortschritt wird automatisch auf diesem iPad gespeichert. Du musst nach einem Starter nichts zusätzlich anklicken und kannst den Tab offen lassen, neu laden oder schließen.

## 2. Für die Lehrkraft im Unterricht

1. Öffne `codeliste.html`, drucke die A4-Liste und trage Einsatzdatum und Notizen ein.
2. Nenne zu Stundenbeginn nur den Code des aktuellen Starters.
3. Alle Lernenden öffnen `index.html` und geben denselben Code ein.
4. Der Starter dauert ungefähr drei Minuten. Es gibt keinen sichtbaren Countdown.
5. Ergebnisse dienen der Aktivierung und formativen Diagnose, nicht der Benotung.
6. Öffne `lehrkraft-vorschau.html`, um jeden Starter und Block direkt zu kontrollieren. Lösungen, Hinweise und Diagnoseangaben lassen sich dort einblenden; Schülerdaten werden nicht gelesen oder verändert.

## 3. TXT-Abgabe über Teams

1. Die Schülerin oder der Schüler öffnet auf der Startseite **Sicherung und Gerätewechsel** und wählt **Sicherungsdatei speichern**.
2. Die entstandene TXT-Datei wird in der vereinbarten Teams-Aufgabe als Datei abgegeben.
3. Die Datei ist zugleich lesbarer Bericht, Auswertungsdatei und Sicherung.

## 4. Fortschritt wiederherstellen

1. Auf dem Zielgerät **Sicherung und Gerätewechsel** öffnen und **Sicherungsdatei einlesen** wählen.
2. Die eigene TXT-Datei auswählen.
3. Anzeigename, Exportzeit und Zahl der Bearbeitungen in der Vorschau prüfen.
4. **Zusammenführen** wählen. Neuere lokale Daten werden nicht still überschrieben; unterschiedliche Bearbeitungen werden zusammengeführt.

## 5. Lehrkraftauswertung

1. `lehrkraft.html` öffnen.
2. Mehrere TXT-Dateien gleichzeitig auswählen oder in die Ablagefläche ziehen.
3. Bei Bedarf die tatsächlichen Einsatzdaten der Starter eintragen.
4. Nach Person, Starter oder Kompetenz filtern. Datumsabweichungen werden neutral markiert.
5. Mit **Übersicht als CSV** die gefilterten Detaildaten speichern.
6. Alle Verarbeitung bleibt lokal im Browser. Es findet kein Upload statt.

## Lehrkraftvorschau

- `lehrkraft-vorschau.html` bietet den direkten Zugriff auf alle Starter und Aufgabenblöcke.
- Lösungen, akzeptierte Antworten, beide Hinweisschritte, Kompetenzen und Fehlerkategorien können kontrolliert werden.
- **Neu mischen** prüft die randomisierte Darstellung.
- **Im Schülermodus öffnen** startet die echte Aufgabenoberfläche in einer ausdrücklich nicht speichernden Simulation.
- Die Vorschau verwendet weder den Anzeigenamen noch vorhandene Schülerfortschritte.

## 6. Spätere Starter ab Nummer 12 ergänzen

1. In `data.js` neue Objekte am Ende der Liste ergänzen.
2. Jede neue Station erhält eine neue, nie zuvor verwendete ID (ab `S012`), einen eindeutigen Code und eine eigene Inhaltsversion.
3. Bestehende IDs, Nummern und Item-IDs nicht ändern oder wiederverwenden.
4. Die Paket-ID `spanisch-vorkurs-01` und den Speicherschlüssel der Version 1 unverändert lassen.
5. Neue Items nach dem vorhandenen Muster mit Kompetenz, Fehlerkategorie, zwei Hinweisen und Lösung anlegen.
6. Multiple-Choice-Lösungen immer über ihren stabilen Wert, nie über ihre Position definieren.
7. Vor der Nutzung Codes, Lösungen, TXT-Rundlauf und Lehrkraftimport erneut prüfen. Die automatische Prüfung kann mit `node tests/quality-check.mjs` ausgeführt werden.

## Datenschutz und Speicherung

Es wird nur der Anzeigename erfasst. Fortschritt und Einsatzdaten liegen ausschließlich im lokalen Browserspeicher. Das Löschen der Website-Daten im Browser löscht diesen lokalen Stand; deshalb regelmäßig eine TXT-Sicherung erstellen.

## Änderungen in Version 1.1

- Startseite mit kompaktem spanischem Einstieg und zentraler Lernroute neu geordnet.
- Automatische Speicherung erläutert; Sicherungsfunktionen nachgeordnet und verständlicher benannt.
- Spanische positive Rückmeldungen ergänzt.
- Artikel in Starter 1, Block 1, verbindlich gemacht.
- Lageangaben und Verständnisfragen in Starter 1 sowie Textfragen in Starter 2 stärker auf Spanisch formuliert.
- Nicht-speichernde klickbare Lehrkraftvorschau ergänzt.

## Ergänzung in Version 2.0

- Die Lernroute wurde kompatibel um die Starter 6–11 erweitert; Starter 1–5 und ihre stabilen IDs blieben unverändert.
- Neue Progression: Orthografie und Wortschatz, regelmäßige `-ar`-Verben, Fragen und Berufe, regelmäßige `-er`-Verben, Subjekterkennung mit ersten `-ir`-Formen sowie eine kumulative Wiederholung.
- Alle geeigneten Item- und Antwortreihenfolgen werden pro Bearbeitung stabil randomisiert. Eine neue freiwillige Wiederholung erhält eine neue Reihenfolge.
- Bei `leer`, `aprender` und `comprender` kann die deutsche Bedeutung direkt in der Aufgabe eingeblendet werden.
- Die Lehrkraftvorschau, Auswertung, TXT-Sicherung, CSV-Ausgabe und Codeliste berücksichtigen nun alle elf Starter.
- Die Codeliste wurde für elf Stationen in der A4-Druckansicht verdichtet.
- `tests/quality-check.mjs` kontrolliert unter anderem unveränderte Altdaten, eindeutige IDs und Codes, Pflichtartikel sowie die Verteilung richtiger Antwortpositionen.
