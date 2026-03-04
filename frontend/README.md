# PromptLab Frontend

A modern React + Vite frontend for PromptLab, a platform for managing and organizing AI prompts.

## Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components for routing
│   ├── services/       # API clients and external services
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # Global and component styles
│   ├── App.jsx         # Root component
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
└── .gitignore          # Git ignore rules
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Directory Guide

### `/src/components`
Reusable UI components used across pages.

Structure:
```
components/
├── Button/
│   ├── Button.jsx
│   └── Button.css
├── Card/
│   ├── Card.jsx
│   └── Card.css
```

### `/src/pages`
Page components that represent full routes/screens.

Examples:
- `HomePage.jsx`
- `PromptsPage.jsx`
- `CollectionsPage.jsx`

### `/src/services`
API clients and external service integrations.

Examples:
- `api.js` - Axios instance and base configuration
- `promptService.js` - Prompt-related API calls
- `authService.js` - Authentication logic

### `/src/hooks`
Custom React hooks for shared logic and state management.

Examples:
- `usePrompts.js` - Hook for prompt data fetching
- `useFetch.js` - Generic fetch hook
- `useAuth.js` - Authentication hook

### `/src/styles`
Global styles and CSS files.

- `index.css` - Global styles
- `App.css` - App component styles

## API Integration

The frontend is configured to proxy API requests to the backend at `http://localhost:5000`.

Example API call:
```javascript
// requests to /api/* will be proxied to http://localhost:5000/*
fetch('/api/prompts')
```

## Environment Variables

Create a `.env.local` file in the frontend directory for environment-specific settings:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Access in code:
```javascript
const apiBase = import.meta.env.VITE_API_BASE_URL
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Commit and push your changes
5. Create a pull request

## License

MIT
