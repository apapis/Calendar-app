# Calendar-app

To jest aplikacja kalendarza stworzona przy użyciu React, React Scheduler (https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/) i Firebase. Umożliwia użytkownikom przeglądanie, dodawanie, edytowanie i usuwanie wydarzeń w kalendarzu z interfejsem w języku polskim.

## Funkcjonalności

- Widok kalendarza (Scheduler) w języku polskim
- Dodawanie, edytowanie i usuwanie wydarzeń
- Przełączanie między widokiem dziennym, tygodniowym i miesięcznym
- Zapisywanie i odczytywanie wydarzeń z bazy danych Firebase Firestore

## Technologie

- React 18.2.0
- Vite 5.0.8
- @devexpress/dx-react-core 4.0.8
- @devexpress/dx-react-scheduler 4.0.8
- @devexpress/dx-react-scheduler-material-ui 4.0.8
- Firebase 10.7.2
- Material-UI (@mui/material, @emotion/react, @emotion/styled)

## Instalacja

1. Sklonuj repozytorium:

   ```
   git clone https://github.com/apapis/Calendar-app.git
   ```

2. Przejdź do katalogu projektu:

   ```
   cd Calendar-app
   ```

3. Zainstaluj zależności:

   ```
   npm install
   ```

4. Skonfiguruj Firebase:
   - Utwórz projekt w [Firebase Console](https://console.firebase.google.com/)
   - Dodaj konfigurację Firebase do pliku `.env` (pamiętaj, aby nie commitować tego pliku do repozytorium):
     ```
     VITE_FIREBASE_API_KEY=twój_api_key
     VITE_FIREBASE_AUTH_DOMAIN=twój_auth_domain
     VITE_FIREBASE_PROJECT_ID=twój_project_id
     VITE_FIREBASE_STORAGE_BUCKET=twój_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=twój_messaging_sender_id
     VITE_FIREBASE_APP_ID=twój_app_id
     ```

## Uruchamianie

Aby uruchomić aplikację w trybie deweloperskim:

```
npm run dev
```

## Budowanie

Aby zbudować aplikację do produkcji:

```
npm run build
```

Zbudowane pliki znajdą się w katalogu `dist`.

## Struktura projektu

- `src/` - kod źródłowy aplikacji
  - `components/` - komponenty React
    - `Calendar.jsx` - główny komponent kalendarza
  - `firebase/` - konfiguracja i funkcje związane z Firebase
    - `firebaseConfig.js` - konfiguracja Firebase
  - `App.jsx` - główny komponent aplikacji
  - `main.jsx` - punkt wejścia aplikacji
- `public/` - statyczne zasoby
- `index.html` - główny plik HTML
- `vite.config.js` - konfiguracja Vite
- `.gitignore` - plik konfiguracyjny Git
- `package.json` - konfiguracja projektu i zależności

## Licencja

Ten projekt jest udostępniany na licencji MIT. Szczegóły znajdziesz w pliku [LICENSE](LICENSE).

## Autor

Projekt stworzony przez [apapis](https://github.com/apapis).
