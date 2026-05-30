# Velocity - Premium Car Dealership

## Overview

Velocity is a high-end automotive marketplace designed for the Pakistani market, featuring luxury and performance vehicles. The application provides a seamless browsing experience with a price range filter, individual car detail views, and a sophisticated lead generation system.

## Project Structure

### Frontend
- **public/**: Contains the static assets and pure HTML/JS frontend.
  - `index.html`: Landing page with featured luxury vehicles.
  - `inventory.html`: Full inventory list with interactive price, category, and color filters.
  - `car-details.html`: Detailed vehicle specifications and reservation system.
  - `contact.html`: Concierge service inquiry form.
  - `js/`: Vanilla JavaScript modules for state management and API integration.
  - `css/`: Premium custom styling with a focus on dark-mode aesthetics.

### Backend
- **server/**: Node.js/Express backend implementation.
  - `routes.ts`: RESTful API endpoints for car data and order processing.
  - `storage.ts`: Database abstraction layer using Drizzle ORM.
- **shared/**: Shared TypeScript types and Zod validation schemas.

## Technical Details
- **Database**: SQLite (Neon-ready) for reliable data persistence.
- **ORM**: Drizzle ORM for type-safe database operations.
- **Styling**: Modern CSS using HSL variables for consistent theming.
- **Currency**: All pricing is handled in PKR with localized formatting.

## Recent Changes
- Implemented a premium price range slider for inventory filtering.
- Updated inventory with authentic Pakistani vehicle data.
- Streamlined project structure by removing legacy assets and temporary files.
