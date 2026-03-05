# <img width="40" height="40" alt="Movie_Logo" src="https://github.com/user-attachments/assets/c4c0311f-3c50-42d3-ba50-803c99ffc998" /> Movie Finder
---

## Project Overview

Movie Finder is a single page application built with React and TypeScript that allows users to search for films using the TMDB API. The application features a responsive search interface, a debounced search mechanism to optimize API calls, and a detailed overlay for viewing movie metadata and cast information.

## Core Features

* **Global Search:** Find movies by title with real-time updates using a debounced input.
* **Responsive Design:** A mobile-first layout that adapts from single-column mobile views to multi-column desktop grids.
* **Detailed Overlay:** A semantic HTML5 modal providing overview, ratings, genres, and cast details without navigating away from search results.
* **Persistent Search:** Utilizes local storage to keep track of recent search queries.
* **Optimized Navigation:** Configured for seamless deployment on GitHub Pages using custom base paths.

## Technical Stack

* **Framework:** React 18
* **Language:** TypeScript
* **Routing:** React Router DOM
* **API:** TMDB (The Movie Database)
* **Build Tool:** Vite
* **Deployment:** GitHub Pages

---

## **Project Structure Overview**
```
movie-app/
├── .env                         - Environment variables (e.g., TMDB API Key).
├── .gitignore                   - Files to exclude from version control.
├── eslint.config.js             - Linter configuration.
├── index.html                   - Main HTML entry point for the browser.
├── package.json                 - Project dependencies and scripts.
├── package-lock.json            - Dependency tree lockfile.
├── README.md                    - Project documentation.
├── tsconfig.app.json            - TypeScript config for the application.
├── tsconfig.json                - Main TypeScript configuration.
├── tsconfig.node.json           - TypeScript config for Vite/Node utilities.
├── vite.config.ts               - Vite build tool configuration.
└── src/
    │
    ├── App.css 
    ├── App.tsx                  - The root React component, handling main routing and layout.
    ├── index.css
    ├── main.tsx                 - TypeScript entry point that renders App into the DOM.
    │
    ├── assets/                  - Static, uncompiled media files.
    │   └── Movie_Logo.png       - Application logo.
    │
    ├── components/
    │   ├── movieCard.css         - Styles for individual movie posters/previews.
    │   ├── movieCard.tsx         - A component displaying brief movie info.
    │   ├── movieDetails.css      - Styles for the detailed overlay or modal.
    │   ├── movieDetails.tsx      - The overlay that shows complete movie metadata and cast.
    │   ├── searchbar.css         - Styles for the main search input group.
    │   └── searchbar.tsx         - The search input and button component.
    │
    ├── hooks/
    │   └── useDebounce.ts        - A hook that delays updating a value, optimizing API calls during search input.
    │
    ├── pages/
    │   ├── home.css              - Styles for homepage as well as recent searches.
    │   ├── home.tsx              - The default homepage view with recent searches.
    │   ├── searchResultsPage.css - Styles for displaying search results grids.
    │   └── searchResultsPage.tsx - The page that fetches and displays results based on the search query.
    │
    ├── services/
    │   └── movieApi.ts           - Functions for fetching data from the TMDB API (e.g., getCast, searchByTitle).
    │
    ├── types/
    │   └── movieTypes.ts         - Interfaces defining data shapes like Movie, CastMember, Genre, or API responses.
    │
    └── utils/
        ├── mapper.ts             - Functions that convert raw API data structures into simplified app-friendly and relevant objects.
        └── storage.ts            - Helper functions for managing data in LocalStorage (e.g., saving recent searches).
```
---

## Installation and Setup

### 1. Clone the repository

`git clone https://github.com/adi-25704/Movie-App.git`

### 2. Install dependencies

`npm install`

### 3. Configure API Key

Create an environment file or directly input your TMDB API key into the fetch utility located in the source code.

### 4. Run development server

`npm run dev`

### 5. Build for production

`npm run build`

---

## Deployment Configuration

This project is specifically configured for GitHub Pages.

* **Base Path:** The Vite configuration uses a conditional base path to ensure assets load correctly under the `/Movie-App/` subdirectory.
* **Routing:** `HashRouter` is configured with a `basename` to prevent navigation errors in production.
