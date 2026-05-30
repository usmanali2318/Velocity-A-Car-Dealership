# 🚗 Velocity

> A full-stack car dealership inventory platform — browse, filter, and manage vehicle listings with a clean and responsive interface.

---

## ✨ Features

- 🔍 **Vehicle Inventory Browser** — Browse and filter cars by make, model, and details
- 🔐 **User Authentication** — Register and log in securely
- 👤 **Profile Management** — Manage your personal account
- 📬 **Contact Page** — Get in touch with the dealership
- 🗄️ **Persistent Storage** — SQLite database powered by Drizzle ORM
- ⚡ **Fast Dev Experience** — Vite + TypeScript for a smooth workflow

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Runtime    | Node.js                             |
| Language   | TypeScript                          |
| Server     | Express.js                          |
| Database   | SQLite                              |
| ORM        | Drizzle ORM                         |
| Frontend   | Vanilla HTML, CSS, JavaScript       |
| Bundler    | Vite                                |

---

## 📁 Project Structure

```
velocity/
├── public/               # Static frontend
│   ├── index.html        # Home page
│   ├── inventory.html    # Car listings
│   ├── auth.html         # Login / Register
│   ├── profile.html      # User profile
│   ├── contact.html      # Contact page
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── inventory.js
│       └── details.js
├── server/               # Backend
│   ├── index.ts          # Entry point
│   ├── routes.ts         # API routes
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Data access layer
│   ├── static.ts         # Static file serving
│   └── vite.ts           # Vite dev integration
├── shared/               # Shared types/schema
│   ├── schema.ts         # Drizzle DB schema
│   └── routes.ts         # Shared route constants
├── drizzle.config.ts     # Drizzle ORM config
├── sqlite.db             # SQLite database file
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/velocity.git
cd velocity

# Install dependencies
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🗄️ Database

This project uses **SQLite** with **Drizzle ORM**. The schema is defined in `shared/schema.ts`.

To apply migrations:

```bash
npx drizzle-kit push
```

---

## 📸 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page |
| Inventory | `/inventory.html` | Browse all vehicles |
| Auth | `/auth.html` | Login / Register |
| Profile | `/profile.html` | User account |
| Contact | `/contact.html` | Contact form |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ using Node.js, TypeScript, and Drizzle ORM.
