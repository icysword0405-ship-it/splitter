# Splitter Backend

This is the Node.js backend for the Splitter app.

## Structure

- `src/server.js` — Express API server
- `database/schema.sql` — PostgreSQL / Supabase schema
- `.env.example` — environment configuration example

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your Supabase project values or Postgres connection string
3. Install dependencies:

```bash
npm install
```

4. Start the backend:

```bash
npm run dev
```

## Main API routes

- `GET /api/health`
- `GET /api/groups`
- `GET /api/groups/:groupId`
- `POST /api/groups`
- `GET /api/groups/:groupId/transactions`
- `POST /api/groups/:groupId/transactions`
- `GET /api/groups/:groupId/activity`
- `GET /api/groups/:groupId/settlements`

## Notes

This is a clean backend foundation for your frontend. The frontend can later be connected to the API by replacing mock data with real fetch calls.
