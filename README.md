# Movie Explorer

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38BDF8?logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?logo=reactquery&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-FSD-10B981)

Movie Explorer is a production-style frontend application for browsing movies, searching by title, opening detailed movie pages, and managing a personal favorites list.

The project was built as a strong portfolio-grade pet project with a focus on scalable architecture, type safety, performance, accessibility, and a polished responsive UI. It was fully developed with the help of Codex AI.

## 🎬 Project Overview

Movie Explorer demonstrates how a modern React application can be structured for long-term maintainability while still staying lightweight and fast.

It uses an OpenAPI-generated API client, runtime validation with Zod, TanStack Query for server state, optimistic updates for favorites, LocalStorage persistence, virtualized movie lists, lazy-loaded routes, and a responsive interface for mobile, tablet, and desktop screens.

## ✨ Features

| Area           | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| Movie catalog  | Browse popular movies with responsive cards and poster previews    |
| Search         | Search movies by title with debounced input                        |
| Movie details  | View poster, runtime, rating, genres, overview, director, and cast |
| Favorites      | Add/remove movies with optimistic UI updates                       |
| Persistence    | Favorites are persisted in LocalStorage                            |
| Theme          | Light/dark theme support with CSS tokens                           |
| Localization   | Language selector with localized API requests                      |
| Loading states | Skeleton loaders and app-level loading indicators                  |
| Error handling | Error boundaries and reusable status views                         |
| Responsive UI  | Mobile, tablet, and desktop layouts                                |

## 🧰 Tech Stack

| Technology          | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| React               | UI rendering and component model               |
| TypeScript          | Static typing and safer refactoring            |
| Vite                | Fast development server and production build   |
| TanStack Query      | Server state, caching, invalidation, mutations |
| TanStack Virtual    | Virtualized rendering for large movie lists    |
| TailwindCSS v3      | Utility-first styling and responsive design    |
| Zod                 | Runtime validation of API data                 |
| openapi-fetch       | Type-safe HTTP client                          |
| openapi-react-query | Typed query hooks from OpenAPI paths           |
| React Router        | Routing and code-split pages                   |
| Vitest              | Unit and component tests                       |
| ESLint / Prettier   | Code quality and formatting                    |
| Husky               | Pre-commit quality gates                       |

## 🏗 Architecture

The codebase follows **FSD (Feature-Sliced Design)** principles. Business domains, user-facing features, reusable widgets, pages, and shared infrastructure are separated into clear layers.

## ⚡ Performance Optimizations

- Virtualization for rendering large movie lists efficiently.
- Lazy loading and route-level code splitting.
- Debounced movie search to reduce unnecessary API requests.
- TanStack Query caching, request deduplication, and controlled invalidation.
- Skeleton loaders to keep perceived performance high.
- Optimized responsive grids for mobile, tablet, and desktop.
- Image lazy loading for movie posters and cast photos.
- LocalStorage persistence for instant favorite state restoration.
- Optimistic updates for favorite toggling.

## ✅ Code Quality

Code quality and consistency are enforced with:

- **ESLint** for static analysis and React/TypeScript rules.
- **Prettier (`.prettierrc`)** for consistent formatting.
- **Husky pre-commit hooks** for quality checks before commits.
- **Strict TypeScript configuration (`tsconfig`)** for safer development.
- **Type-safe development approach** across API, validation, state, and UI layers.
- **Zod schemas** to validate external API responses at runtime.
- **OpenAPI-generated API types** to keep backend contracts explicit and maintainable.

## ♿ Accessibility & SEO

The UI follows accessibility and semantic HTML best practices:

- Semantic landmarks and headings.
- ARIA labels for icon-only buttons and interactive controls.
- Keyboard-friendly buttons, links, and menus.
- Focus-visible states for interactive elements.
- `aria-expanded`, `aria-controls`, and `aria-pressed` where appropriate.
- Descriptive image alt text for posters and cast photos.
- SEO-friendly page structure with meaningful titles and content hierarchy.
- Responsive layout that remains usable on mobile, tablet, and desktop screens.

## 🚀 Installation

```bash
git clone <your-repository-url>
cd movie-explorer
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Then add your API token as described below.

## 📜 Available Scripts

| Script                 | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the Vite development server           |
| `npm run build`        | Type-check and build the app for production |
| `npm run preview`      | Preview the production build locally        |
| `npm run lint`         | Run ESLint over `src`                       |
| `npm run lint:staged`  | Run lint-staged checks                      |
| `npm run typecheck`    | Run TypeScript project checks               |
| `npm run format`       | Format the codebase with Prettier           |
| `npm run test`         | Run Vitest tests once                       |
| `npm run test:watch`   | Run Vitest in watch mode                    |
| `npm run generate:api` | Regenerate the OpenAPI TypeScript schema    |

## 🔐 Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_BASE_URL=https://api.themoviedb.org
VITE_TMDB_ACCESS_TOKEN=your_token_here
```

If you use an IMDb API provider or another movie API provider, expose the token according to your provider contract. The requested IMDb-style variable can look like this:

```env
VITE_IMDB_API_TOKEN=your_token_here
```

> Important: the current OpenAPI client is configured for a TMDB-compatible API and reads `VITE_TMDB_ACCESS_TOKEN` by default. The application will not work without a valid API token for the configured movie API provider.

## 🔌 API Setup

Before starting the application, you must obtain an API token from IMDb or an IMDb API provider. If you use the default TMDB-compatible setup, obtain a TMDB read access token and place it in `VITE_TMDB_ACCESS_TOKEN`.

Step-by-step setup:

1. Register on the IMDb API platform or your preferred IMDb API provider.
2. Generate a personal API token.
3. Create a `.env` file in the project root.
4. Add the token to the environment variables.

Example:

```env
VITE_IMDB_API_TOKEN=your_token_here
```

For the default TMDB-compatible client used by this codebase:

```env
VITE_TMDB_ACCESS_TOKEN=your_token_here
```

The application will not work without a valid API token.

The generated API schema can be updated with:

```bash
npm run generate:api
```

## 📁 Project Structure

```text
movie-explorer/
├── public/
│   └── favicon.svg
├── scripts/
│   └── lint-staged.mjs
├── src/
│   ├── app/
│   ├── pages/
│   ├── widgets/
│   ├── features/
│   ├── entities/
│   └── shared/
├── .prettierrc
├── eslint.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🧪 Testing

The project uses Vitest and Testing Library for unit and component-level tests.

```bash
npm run test
```

Examples covered in the codebase include:

- domain model validation;
- API data mapping;
- LocalStorage utilities;
- favorite movie optimistic UI behavior.

## 🤖 Additional Notes

- The project was fully developed with the help of **Codex AI**.
- The codebase follows scalable frontend architecture principles.
- Performance optimization was an important goal from the start.
- The UI is modern, responsive, and user-friendly.
- The implementation is designed to look and feel like a production-grade frontend project while remaining approachable as a portfolio pet project.
