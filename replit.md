# Velocity - Premium Car Dealership

## Overview

Velocity is a full-stack e-commerce website for selling cars, built with a premium, advanced UI. The application features a car inventory system with filtering capabilities, individual car detail pages, reservation/order functionality, and a contact form. The frontend uses vanilla HTML/CSS/JavaScript while the backend runs on Node.js with Express and SQLite for data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology**: Pure HTML5, CSS3, and vanilla JavaScript (no React/Vue frameworks)
- **Pages**: 
  - `index.html` - Homepage with hero section and featured vehicles
  - `inventory.html` - Car listing with category/color/price filters
  - `car-details.html` - Individual car details with image gallery and reservation modal
  - `contact.html` - Contact form and business information
- **Styling**: Custom CSS with CSS variables for theming, uses Cinzel and Manrope fonts
- **JavaScript Files**: `inventory.js` handles filtering/listing, `details.js` handles car detail pages

### Backend Architecture
- **Framework**: Express.js running on Node.js
- **Entry Point**: `server/index.ts` creates HTTP server and configures middleware
- **Routing**: `server/routes.ts` defines API endpoints
- **Static Files**: `server/static.ts` serves the `public` directory
- **Development**: Vite integration via `server/vite.ts` for hot module replacement

### API Structure
Defined in `shared/routes.ts` with Zod validation:
- `GET /api/cars` - List cars with optional filters (category, price range, color, sort)
- `GET /api/cars/:id` - Get single car details
- `POST /api/orders` - Create a reservation/order
- `POST /api/contact` - Submit contact form message

### Data Storage
- **Database**: SQLite using `better-sqlite3` driver
- **ORM**: Drizzle ORM with schema defined in `shared/schema.ts`
- **Database File**: `sqlite.db` in project root
- **Tables**:
  - `cars` - Vehicle inventory (name, model, category, price, color, availability, quantity, images)
  - `orders` - Customer reservations (customer info, car reference, quantity)
  - `contact_messages` - Contact form submissions

### Storage Layer
- `server/storage.ts` implements `IStorage` interface
- `DatabaseStorage` class handles all database operations
- Cars are automatically seeded on server startup via `storage.seedCars()`

### Shared Code
- `shared/schema.ts` - Drizzle table definitions and Zod validation schemas
- `shared/routes.ts` - API route definitions with input/output types
- Types are shared between frontend and backend for consistency

## External Dependencies

### Database
- **SQLite** - Local file-based database (`sqlite.db`)
- **Drizzle ORM** - Database queries and schema management
- **better-sqlite3** - SQLite driver for Node.js

### Build & Development
- **Vite** - Development server with HMR
- **TypeScript** - Type checking via `tsx` for runtime
- **drizzle-kit** - Database migrations (`npm run db:push`)

### UI Libraries
- **Radix UI** - Accessible component primitives (dialog, dropdown, tabs, etc.)
- **TanStack React Query** - Data fetching (available but frontend uses vanilla JS)
- **class-variance-authority** & **clsx** - CSS class utilities

### Key NPM Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run db:push` - Push schema changes to database