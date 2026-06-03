nm# BookStar Frontend

A modern React + TypeScript frontend for the BookStar financial marketplace platform, built with Vite, Tailwind CSS, and React Router.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client with auth interceptor

## Project Structure

```
src/
├── api/
│   └── client.ts          # Axios instance with auth interceptor
├── components/            # Reusable React components
├── context/              # React Context (for global state)
├── hooks/                # Custom React hooks
├── pages/
│   ├── HomePage.tsx              # Main discovery feed
│   ├── LoginPage.tsx             # User authentication
│   ├── RegisterPage.tsx          # User registration with role selection
│   ├── ListingDetailsPage.tsx     # Listing details and booking
│   ├── ProfilePage.tsx           # User profile and dashboard
│   └── NotFoundPage.tsx          # 404 page
├── styles/
│   └── globals.css       # Global Tailwind styles and components
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Main app component with routing
├── main.tsx              # Application entry point
└── index.css             # Tailwind imports
```

## Available Routes

- `/` - Home page (marketplace feed)
- `/auth/login` - Login page
- `/auth/register` - Registration page (with role selection)
- `/listing/:id` - Listing details page
- `/profile` - User profile (protected route)

## Setup & Development

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your API base URL:
```bash
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Running Locally

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## API Integration

### Authentication

The API client automatically handles JWT token management:

1. **Login/Register**: Token is stored in `localStorage` as `access_token`
2. **Auto-Attach**: Bearer token is automatically added to all requests
3. **401 Handling**: Invalid tokens trigger automatic redirect to login

### Usage Example

```typescript
import apiClient from './api/client';

// Get listings
const listings = await apiClient.get('/listings');

// Create listing
const newListing = await apiClient.post('/listings', {
  title: 'Math Tutoring',
  subject: 'Math',
  price: 50
});

// Logout
apiClient.clearToken();
```

## Design System

### Color Palette

- **Primary** (`primary-*`): Sky blue (#0ea5e9) - Main brand color
- **Secondary** (`secondary-*`): Purple (#a855f7) - Accent color
- **Success** (`success-*`): Green (#22c55e) - Positive actions
- **Warning** (`warning-*`): Amber (#eab308) - Cautions
- **Error** (`error-*`): Red (#ef4444) - Errors

### Tailwind Components

```jsx
// Primary button
<button className="btn-primary">Click me</button>

// Card container
<div className="card">Content here</div>

// Form input
<input className="input-field" type="text" />
```

## Protected Routes

The `ProtectedRoute` component ensures only authenticated users can access certain pages:

```typescript
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
```

## Development Workflow

### Day 1 Completed Tasks ✓

- ✓ Frontend scaffolding with React + TypeScript
- ✓ Tailwind CSS configuration with custom color palette
- ✓ React Router setup with 5+ page routes
- ✓ Axios API client with auth interceptor
- ✓ Auth pages (Login, Register with role selection)
- ✓ Protected route component for authenticated pages
- ✓ Navigation component with auth state
- ✓ TypeScript type definitions for all major entities
- ✓ Project structure for scalability

### Next Steps (Day 2-5)

1. **Components**: Build reusable ListingCard, ReviewCard, TransactionCard components
2. **Listing CRUD**: Implement create, read, update, delete listing flows
3. **Payment Integration**: Hook up Telebirr payment modal
4. **Reviews**: Implement review submission and display
5. **Dashboard**: Build Sharer earnings and Taker orders pages

## Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run lint         # Run ESLint
```

## Type Checking

TypeScript is configured with strict mode. The build will fail if there are type errors.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api/v1` |

## Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically try the next available port.

### Build errors
Run `npm run build` to see all TypeScript and build errors.

### API connection issues
Verify `VITE_API_BASE_URL` in `.env.local` matches your backend URL.

## Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vite.dev)
- [Axios](https://axios-http.com)
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
