# TasksManager

Celem tego projektu było stworzenie aplikacji umożliwiającej zarządzanie zadaniami. 

Dane są gromadzone i wysyłane do lokalnego API stworzonego przy pomocy json-servera.

Główne zadania:

- obsługa formularza (dodawanie zadań)
- rozpoczęcie odliczania czasu
- zakończenie odliczania czasu, jeśli zostało wcześniej rozpoczęte
- zakończenie zadania, co powoduje przeniesienie go na koniec listy
- usunięcie zadania z listy, co powoduje, że zadanie nie jest renderowane, ale jest przechowywane w state 
- zabezpieczenie przed urochomieniem kolejnego zadania jeśli bieżące jeszcze nie jest zakończone

## Użyte technologie

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![JSON Server](https://img.shields.io/badge/JSON%20Server-6f736d?style=for-the-badge&logo=JSON&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-4f736d?style=for-the-badge&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![BEM Methodology](https://img.shields.io/badge/BEM%20Methodology-29BDfD?style=for-the-badge&logo=BEM&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## Instalacja i konfiguracja

W projekcie zostały użyte [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Jeśli masz je zainstalowane, wpisz w terminalu: 
````
npm i
````

Aby otworzyć aplikację w trybie deweloperskim użyj komendy: 
````
npm start
````

Jeśli nie masz zainstalowanego JSON serwera wpisz w terminalu komendę:
```
npm install -g json-server@0.17
```

W kolejnym terminalu uruchom API:
```
json-server --watch ./db/data.json --port 3005
```

Od teraz możesz korzystać z API pod adresem:
```
http://localhost:3005/data
````

Aplikacja jest dostępna pod adresem: 
````
http://localhost:8080
````