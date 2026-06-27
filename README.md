# 🏋️‍♂️ Aplikacja Treningowa (Workout Logger)

Lokalna, responsywna aplikacja do śledzenia treningów siłowych, zbudowana w architekturze offline-first. Projekt pozwala na zarządzanie bazą ćwiczeń oraz precyzyjne logowanie serii treningowych bezpośrednio w pamięci przeglądarki.

## 🛠 Stack Technologiczny
* **Frontend:** Angular (Standalone Components, Signals, Routing)
* **Język:** TypeScript / HTML / CSS
* **Baza danych:** Dexie.js (IndexedDB) - pełen zapis offline

---

## 🚀 Obecne Funkcjonalności (Wersja 1.0)

### 1. Baza Danych i Architektura
- [x] Konfiguracja lokalnej relacyjnej bazy danych z tabelami `excercises` i `workoutLog`.
- [x] Automatyczny seeding danych (ładowanie domyślnego planu ćwiczeń przy pierwszym uruchomieniu).

### 2. Zarządzanie Ćwiczeniami (Ekran Główny)
- [x] Odczyt i reaktywne wyświetlanie listy ćwiczeń.
- [x] Dodawanie własnych ćwiczeń z wyborem kategorii (Push/Pull, itp.).
- [x] Usuwanie ćwiczeń z bazy z natychmiastowym odświeżaniem interfejsu dzięki Angular Signals.

### 3. Logowanie Treningu (Dziennik)
- [x] Dynamiczny routing dla dedykowanych ekranów ćwiczeń (`/log/:id`).
- [x] Zaawansowana logika zapisu typu Upsert (Update/Insert) dla modeli `WorkoutLog` i `WorkoutSet`.
- [x] Walidacja formularza i dynamiczne blokowanie przycisku zapisu.
- [x] Mechanizm zakładek (State Management) rozdzielający widok dzisiejszego treningu od historii.
- [x] Matematyczny silnik obliczający szacowane 1RM (wzór Epleya) dla każdej serii.
- [x] Usuwanie pojedynczych błędnych serii z tablicy w czasie rzeczywistym z przeliczaniem całkowitego tonażu.
- [x] Wyświetlanie historycznych treningów z wykorzystaniem filtrowania bazy danych NoSQL.

---

## 💻 Jak uruchomić projekt lokalnie

1. Otwórz terminal w folderze projektu i zainstaluj zależności (jeśli to pierwsze uruchomienie po sklonowaniu):
   ```bash
   npm install
2. Uruchom serwer deweloperski Angulara:
   ```bash
   ng serve
3. Otwórz przeglądarkę i wejdź pod adres http://localhost:4200/. Aplikacja automatycznie utworzy lokalną bazę danych.
