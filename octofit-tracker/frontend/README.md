# Octofit Tracker Frontend

React 19 + Vite presentation tier for the Octofit Tracker multi-tier application.

## Features

- **React Router** - Navigation between Users, Activities, Workouts, Teams, and Leaderboard
- **Bootstrap 5** - Responsive UI styling
- **Vite** - Fast development build tool
- **Environment Variables** - Secure API endpoint configuration

## Setup

### Prerequisites

- Node.js (LTS)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file in the frontend directory:
```bash
cp .env.local.example .env.local
```

3. **Important**: Update `VITE_CODESPACE_NAME` in `.env.local` with your GitHub Codespace name:
```
VITE_CODESPACE_NAME=my-codespace-name
```

You can find your Codespace name in:
- GitHub Codespaces dashboard
- The URL of your Codespace (first part before the dash)
- `echo $CODESPACE_NAME` in your terminal

### Development

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

### Linting

Check code quality:
```bash
npm run lint
```

## Environment Variables

The frontend uses Vite environment variables to configure the API endpoint.

### VITE_CODESPACE_NAME

**Required** for production/Codespace environments.

- Used to construct the API endpoint: `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/`
- If not set, the app will default to `http://localhost:8000/api` for local development
- Must be lowercase with hyphens only

**Example `.env.local`:**
```
VITE_CODESPACE_NAME=my-codespace-abc123
```

## API Integration

The frontend communicates with the backend API using the `api.js` utility module.

### API Endpoints

All API requests are made to:
```
https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/{endpoint}/
```

Or for local development:
```
http://localhost:8000/api/{endpoint}/
```

### Available Endpoints

- `/users/` - User management
- `/activities/` - Activity tracking
- `/workouts/` - Workout management
- `/teams/` - Team management
- `/leaderboard/` - Leaderboard rankings

### Response Format

The API utility handles both:
- **Paginated responses** with a `results` key
- **Direct array responses**

Example usage:
```javascript
import { fetchFromApi, handleResponse } from '../utils/api'

const data = await fetchFromApi('users')
const usersList = handleResponse(data)
```

## Components

- **App.jsx** - Main routing and navigation
- **Components/Users.jsx** - User listing
- **Components/Activities.jsx** - Activity tracking
- **Components/Workouts.jsx** - Workout management
- **Components/Teams.jsx** - Team management
- **Components/Leaderboard.jsx** - Leaderboard rankings

## Styling

- Bootstrap 5 for responsive layout
- Custom CSS in `App.css` for Octofit branding
- CSS variables for theming in `index.css`

## Troubleshooting

### API Connection Issues

If you see errors like `https://undefined-8000.app.github.dev`:
1. Check that `.env.local` exists
2. Verify `VITE_CODESPACE_NAME` is set correctly
3. Restart the dev server: `npm run dev`

### Port Already in Use

If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Cross-Origin Issues

Ensure the backend is running and accessible at the configured API endpoint.

