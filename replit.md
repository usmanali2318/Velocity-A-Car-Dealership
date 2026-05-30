# Velocity - Car E-Commerce Platform

## Overview

Velocity is a full-stack e-commerce website for selling cars, built with a premium dark theme UI. The platform allows users to browse car inventory, view detailed car information, place orders, and contact the dealership. The application features a React frontend with a Node.js/Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Forms**: React Hook Form with Zod validation

The frontend follows a page-based structure with reusable components. Key pages include Home, Inventory, CarDetails, and Contact. The design uses a premium dark theme with gold accent colors, targeting a luxury automotive aesthetic.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in `shared/routes.ts`
- **Validation**: Zod schemas for request/response validation
- **Build Tool**: esbuild for production bundling, Vite for development

The backend serves both the API and static files. In development, Vite middleware handles hot module replacement. In production, pre-built static files are served from the `dist/public` directory.

### Data Layer
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts`
- **Migrations**: Drizzle Kit with `db:push` command

Database tables include:
- `cars` - Vehicle inventory (name, model, category, price, color, quantity, image)
- `orders` - Customer orders with shipping information
- `contact_messages` - Contact form submissions

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Drizzle table definitions and Zod schemas
- `routes.ts` - API route definitions with type-safe input/output schemas

### Build System
- Development: `npm run dev` starts the Express server with Vite middleware
- Production: `npm run build` compiles the client (Vite) and server (esbuild)
- Database: `npm run db:push` syncs schema to PostgreSQL

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection string via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema-first ORM with type-safe queries
- **connect-pg-simple**: Session storage for Express (available but not currently used)

### UI Framework
- **Shadcn/ui**: Pre-built accessible components based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast TypeScript/JavaScript bundler for server
- **Drizzle Kit**: Database migration tool

### Fonts
- Google Fonts: Cinzel (display headings) and Manrope (body text)

### Images
- Car images are expected at `/images/cars/` path
- Hero background uses Unsplash CDN images