# Phonebook Backend

Full Stack Open exercises 3.1–3.22.

## Local setup

1. Copy `.env.example` to `.env`.
2. Replace the placeholder MongoDB Atlas values in `.env`.
3. Install dependencies and start the backend:

```bash
npm install
npm run dev
```

The backend runs at `http://localhost:3001`. API requests are available under
`/api/persons`, and the production frontend is served from `dist`.

## Command-line database

After setting `MONGODB_URI_TEMPLATE` in `.env`:

```bash
node mongo.js yourpassword
node mongo.js yourpassword "Anna Example" 040-1234567
```

## Validation

```bash
npm run lint
```

