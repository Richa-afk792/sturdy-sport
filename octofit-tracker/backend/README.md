# OctoFit Backend API

Express + TypeScript API for OctoFit Tracker.

## Runtime URL configuration

The API always listens on port `8000`.

`src/server.ts` builds the API base URL from `CODESPACE_NAME` when available:

- Codespaces: `https://$CODESPACE_NAME-8000.app.github.dev`
- Local fallback: `http://localhost:8000`

## Run the API

```bash
npm --prefix /workspaces/sturdy-sport/octofit-tracker/backend run dev
```

## Verify key endpoints

```bash
curl -sS -i http://localhost:8000/api/users
curl -sS -i http://localhost:8000/api/activities
```

## Build and run

```bash
npm --prefix /workspaces/sturdy-sport/octofit-tracker/backend run build
npm --prefix /workspaces/sturdy-sport/octofit-tracker/backend run start
```