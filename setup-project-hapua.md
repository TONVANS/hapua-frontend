# Project Setup and Structure
# For HAPUA Event Management System (API Integration Version)

This document outlines the project setup steps, package installations, and folder structure based on **Next.js (App Router)**. It emphasizes API integration with the existing Backend, **Server Components**, **Security**, and **Performance**.

---

## 1. Project Initialization

Use the following command to create a new Next.js project (choose TypeScript, Tailwind CSS, and App Router):

```bash
npx create-next-app@latest frontend
# When prompted, select the following options:
# - Would you like to use TypeScript? Yes
# - Would you like to use ESLint? Yes
# - Would you like to use Tailwind CSS? Yes
# - Would you like to use `src/` directory? Yes (Recommended for organization)
# - Would you like to use App Router? (recommended) Yes
# - Would you like to customize the default import alias (@/*)? No
```

## 2. Essential Package Installation

After the project is successfully created, navigate into the directory and install these necessary packages:

### 2.1 UI & Styling (shadcn/ui & Animations)
```bash
# Initialize and configure shadcn/ui
npx shadcn-ui@latest init

# Pre-install essential components
npx shadcn-ui@latest add button card input form select table tabs dialog

# Install Framer Motion for smooth animations & Lucide for icons
npm install framer-motion lucide-react
```

### 2.2 Security & Validation
```bash
# Zod for Data Validation (Crucial for form security)
npm install zod @hookform/resolvers

# NextAuth.js (Optional: If managing sessions via NextAuth alongside your backend API)
npm install next-auth 
```

### 2.3 API & State Management
```bash
# Axios for handling HTTP requests (Interceptors, tokens, etc.)
npm install axios

# Zustand for lightweight and fast global state management
npm install zustand

# Cookies management for client-side secure token storage
npm install js-cookie
npm i --save-dev @types/js-cookie
```

### 2.4 Performance & Utils
```bash
# For efficient classname management (usually comes with shadcn)
npm install clsx tailwind-merge date-fns
```

---

## 3. Folder Structure

This structure removes direct database configurations and replaces them with a `services` layer for API consumption and a `store` layer for state management.

```text
frontend/
├── public/                 # Static assets like images, logos
├── src/
│   ├── app/                # (App Router) Handles Routing and Pages
│   │   ├── (public)/       # Route Group for Public Access (No Login Required)
│   │   │   ├── page.tsx          # Landing Page
│   │   │   ├── agenda/           # Full Agenda Page
│   │   │   └── activities/       # Activity Details Page
│   │   ├── admin/          # Admin Section (Protected Routes)
│   │   │   ├── layout.tsx        # Admin Dashboard Layout (Sidebar, Topbar)
│   │   │   ├── dashboard/        # Dashboard Overview Page
│   │   │   ├── delegations/      # Delegation Management (CRUD)
│   │   │   └── login/            # Admin Login Page
│   │   ├── layout.tsx      # Root Layout (Font config, Main DOM structure)
│   │   └── globals.css     # Tailwind CSS and Global Styles
│   │
│   ├── services/           # API Integration based on Postman Collection
│   │   ├── api.ts                # Axios instance setup (BaseURL, Auth Interceptors)
│   │   ├── auth.service.ts       # POST /api/v1/auth/login
│   │   ├── public.service.ts     # GET /api/v1/public/... (activities, gallery, hotels, travel)
│   │   └── admin.service.ts      # CRUD /api/v1/admin/... (delegations, activities, rooms, etc.)
│   │
│   ├── store/              # Zustand State Management
│   │   ├── useAuthStore.ts       # Manages User Session, JWT Token, and Login State
│   │   └── useUIStore.ts         # Manages UI states (e.g., Sidebar toggle, Modals)
│   │
│   ├── components/         # Separated Components based on usage
│   │   ├── ui/                   # Reusable UI components from shadcn
│   │   ├── server/               # Strictly Server Components
│   │   ├── client/               # Strictly Client Components (Needs "use client")
│   │   └── layout/               # Headers, Footers, Sidebars
│   │
│   ├── lib/                # Utility functions
│   │   ├── utils.ts              # Classname merge utility (shadcn)
│   │   └── validations/          # Zod Schemas for data validation
│   │       ├── register.ts
│   │       └── login.ts
│   │
│   ├── middleware.ts       # (CRITICAL FOR SECURITY) Checks Auth Token before accessing /admin
│   └── types/              # TypeScript Interfaces / Types for API payloads
│       ├── auth.d.ts
│       ├── delegation.d.ts
│       └── activity.d.ts
│
├── next.config.mjs         # Next.js Config (Security Headers and Image Domains)
├── tailwind.config.ts      # Theme and Color setup
└── package.json
```

---

## 4. Development Best Practices

### 4.1 Axios API Setup
- **Centralized Axios Instance (`services/api.ts`):** Configure a base Axios instance that automatically attaches the `Authorization: Bearer <token>` to headers for any requests to the `/admin` endpoints. 
- **Error Handling:** Implement an Axios interceptor to catch `401 Unauthorized` responses, automatically log the user out (clear Zustand state and cookies), and redirect them to `/admin/login`.

### 4.2 Zustand State Management
- Use `useAuthStore` to keep track of the currently logged-in admin's profile and UI state.
- Keep sensitive information (like JWT tokens) in secure cookies (using `js-cookie` or HTTP-only cookies via Next.js Server Actions) rather than persisting them raw in `localStorage`.

### 4.3 Data Fetching & Server Components
- Even with an external Backend, leverage **Server Components** by fetching data using `fetch()` natively inside server components (passing the token from Next.js `cookies()`). This reduces client-side JavaScript.
- Use Axios inside strictly **Client Components** or specialized hooks when interacting with user inputs, form submissions (e.g., creating a new delegation).

### 4.4 Data Validation (Zod)
- Before sending POST/PATCH requests (like registering for an activity or updating admin details), all incoming data from forms must be validated using Zod schemas to ensure it matches the backend's expected DTO payload.
