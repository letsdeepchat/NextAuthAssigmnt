# NextAuthAssignment Frontend

Login authentication with frontend JWT, idle user handling, and image list with search.

## Features
- Register (Full Name, Username, Password, Confirm Password) and Login pages
- Password validation: min 8 characters
- Frontend JWT (`jsonwebtoken`) with static secret and 5-minute expiry (configurable)
- Protected home route
- Idle detection → auto-logout on token expiry (2m idle window configurable)
- Images page: titles fetched from jsonplaceholder, live search, pagination, modal view
- Tailwind CSS UI with responsive cards, no vertical page scroll (image grid scrolls internally)
- Jest + Testing Library tests

## Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Jest + Testing Library

## Getting Started

### 1. Install dependencies
```sh
npm install
````

### 2. Environment Variables (copy into `.env` file)

```env
JWT_SECRET=STATIC_DEMO_SECRET_CHANGE_ME
TOKEN_TTL_SECONDS=300
IDLE_TIMEOUT_MS=120000
```

### 3. Run dev server

```sh
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

## Tests

Run unit/integration tests:

```sh
npm test
```

## Followed Notes

* Frontend-only assignment demo.
* Do not hardcode secrets in real apps.
* Do not store clear-text passwords in production.
* Page layout blocks global scroll; image grid scrolls inside container.


