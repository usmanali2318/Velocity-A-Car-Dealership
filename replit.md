# Velocity - Premium Car Dealership

## Overview

Velocity is a premium car dealership web application that allows users to browse luxury vehicles, view detailed car information, create reservations, and manage their profiles. The application features a dark, elegant design aesthetic targeting high-end automotive customers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML/CSS/JS**: The frontend uses vanilla HTML, CSS, and JavaScript without a modern framework
- **Pages**: index.html (home), inventory.html (car listings), car-details.html, auth.html (login/signup), profile.html, contact.html
- **Styling**: Custom CSS with CSS variables for theming, using Cinzel and Manrope fonts
- **Client-side rendering**: JavaScript files (inventory.js, details.js) fetch data from the API and dynamically render content

### Backend Architecture
- **Express.js**: Node.js server handling API routes and static file serving
- **TypeScript**: Server code written in TypeScript, compiled with tsx
- **API Structure**: RESTful endpoints defined in shared/routes.ts using Zod for validation
  - GET /api/cars - List cars with optional filters (category, price range, color, sort)
  - GET /api/cars/:id - Get single car details
  - POST /api/orders - Create reservation/order
  - POST /api/contact - Submit contact message
  - User authentication endpoints

### Data Storage
- **SQLite**: Local file-based database (sqlite.db)
- **Drizzle ORM**: Type-safe database operations with schema defined in shared/schema.ts
- **Tables**:
  - cars: Vehicle inventory with name, model, category, price, color, images, availability
  - users: User accounts with authentication and payment info
  - orders: Vehicle reservations linking customers to cars
  - contactMessages: Contact form submissions

### Shared Code
- **shared/schema.ts**: Database table definitions and Zod validation schemas
- **shared/routes.ts**: API route definitions with request/response schemas
- Path aliases: `@shared/*` maps to `./shared/*`

### Build System
- **Development**: tsx for running TypeScript directly
- **Production**: Custom build script (script/build.ts) bundles for deployment
- **Vite**: Used for development server with HMR (referenced in server/vite.ts)

## External Dependencies

### Database
- **better-sqlite3**: SQLite driver for Node.js
- **drizzle-orm**: ORM for database operations
- **drizzle-kit**: Database migration tooling

### Server
- **Express.js**: Web server framework
- **cross-env**: Cross-platform environment variables

### Validation
- **Zod**: Runtime type validation for API inputs
- **drizzle-zod**: Generate Zod schemas from Drizzle tables

### UI Components (installed but primarily for potential React migration)
- **Radix UI**: Accessible component primitives
- **@tanstack/react-query**: Data fetching library
- **react-hook-form**: Form handling