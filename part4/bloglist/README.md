# Blog List Backend — Full Stack Open Part 4

Final state for exercises 4.1–4.23.

## Setup

1. Copy `.env.example` to `.env`.
2. Add MongoDB Atlas URIs for separate development and test databases.
3. Set a long random `SECRET` for signing JWTs.
4. Install dependencies with `npm install`.

## Commands

```bash
npm run dev
npm test
npm run lint
```

The development server uses port 3003 by default.

## API

- `GET /api/blogs`
- `POST /api/blogs` (Bearer token required)
- `PUT /api/blogs/:id`
- `DELETE /api/blogs/:id` (creator's Bearer token required)
- `GET /api/users`
- `POST /api/users`
- `POST /api/login`
