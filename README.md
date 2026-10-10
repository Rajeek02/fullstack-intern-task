# Mini SaaS Template Store (fullstack-intern-task)

A full-stack web app where users can register, log in, browse a catalog of templates, mark templates as favorites and see them in a "My Favorites" page. Built for the Gnxtace Technologies Full Stack Web Developer Intern technical task.

## Features

- JWT authentication (register, login, session restore, logout) with bcrypt-hashed passwords
- Templates API with 10 seeded templates, search and category filter
- Favorites: add, remove (toggle) and list, with optimistic UI updates
- Input validation (zod) with field-level error messages and correct HTTP status codes
- Protected routes (`/favorites`) and guest-only routes (`/login`, `/register`)
- Premium dark UI: glassmorphism, animated aurora background, skeleton loaders, spotlight cards, detail modal, toasts
- Fully responsive (mobile, tablet, desktop)
- Works with SQLite out of the box and PostgreSQL in production (set `DATABASE_URL`)

## Tech stack

| Layer | Tools |
|-------|-------|
| Frontend | React 18, Vite, TailwindCSS, React Router, Axios, Framer Motion, Lucide icons, react-hot-toast |
| Backend | Node.js, Express, JWT (jsonwebtoken), bcryptjs, zod, helmet, cors, express-rate-limit |
| Database | SQLite (better-sqlite3) locally, PostgreSQL via `DATABASE_URL` in production |
| Query builder | Knex.js |
| Version control | Git / GitHub |

## Project structure

```
fullstack-intern-task/
├── server/
│   ├── src/
│   │   ├── config/        # environment config
│   │   ├── controllers/   # request handlers + zod validators
│   │   ├── db/            # knex instance, table creation, seed data
│   │   ├── middleware/    # auth, validation, error handling
│   │   ├── routes/        # auth, templates, favorites
│   │   ├── utils/         # ApiError, asyncHandler, SVG thumbnails
│   │   ├── app.js
│   │   └── server.js
│   └── scripts/smoke-test.js
└── client/
    └── src/
        ├── api/           # axios instance + service functions
        ├── components/    # reusable UI
        ├── context/       # Auth + Favorites state
        ├── hooks/
        └── pages/         # Home, Login, Register, Templates, Favorites
```

## Setup instructions

Requirements: Node.js 20 or newer, npm, Git. Node.js 22 LTS or newer is recommended.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env      # Windows PowerShell: copy .env.example .env
npm start                 # API on http://localhost:5000
```

Tables are created and 10 sample templates are seeded automatically on first start.
Optional: `npm run seed` resets the templates, `npm run test:smoke` runs API checks (server must be running).

### 2. Frontend (new terminal)

```bash
cd client
npm install
cp .env.example .env      # Windows PowerShell: copy .env.example .env
npm run dev               # App on http://localhost:5173
```

## Environment variables

**server/.env**

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (default 5000) |
| `JWT_SECRET` | Secret used to sign tokens (use a long random string) |
| `JWT_EXPIRES_IN` | Token lifetime (default 7d) |
| `CLIENT_URL` | Allowed frontend origin(s) for CORS, comma separated |
| `DATABASE_URL` | Optional PostgreSQL connection string; SQLite is used when empty |

**client/.env**

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Base URL of the API, e.g. `http://localhost:5000/api` |

## API reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account, returns token |
| POST | `/api/auth/login` | No | Log in, returns token |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/templates` | Optional | List templates (`?search=` `?category=`) |
| GET | `/api/templates/categories` | No | List categories |
| GET | `/api/templates/:id` | Optional | Template details |
| POST | `/api/favorites/:templateId` | Yes | Add to favorites |
| DELETE | `/api/favorites/:templateId` | Yes | Remove from favorites |
| GET | `/api/favorites` | Yes | Favorited templates of the logged-in user |

Responses are JSON. Errors look like `{ "success": false, "message": "...", "errors": { "field": "..." } }` with status codes 400, 401, 404, 409 and 500.

## Live demo

- Frontend: _add your deployed URL here_
- Backend: _add your deployed URL here_

## Author

**Mohamed Rajeek Shamsudeen**
Email: rajeekmohamed02@gmail.com
GitHub: https://github.com/Rajeek02
LinkedIn: https://www.linkedin.com/in/rajeekmd
Portfolio: https://mohamed-rajeek.netlify.app
