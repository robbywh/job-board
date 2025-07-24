# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (default port 3000)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with Next.js configuration

## Architecture Overview

This is a Next.js 15 job board application using TypeScript, Supabase for backend services, and DaisyUI with Tailwind CSS for styling.

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **Authentication**: Supabase Auth with SSR support
- **Styling**: Tailwind CSS v4 with DaisyUI components
- **State Management**: Server Components with Server Actions
- **TypeScript**: Full type safety with database schema types

### Project Structure

**Core Application (`src/app/`)**:
- Uses App Router with nested layouts
- `(with-navbar)/` - Route group for authenticated pages with navigation
- `auth/` - Authentication endpoints and callbacks
- Server Actions in `actions.ts` files for data mutations

**Authentication Flow**:
- Middleware (`src/middleware.ts`) handles session management across all routes
- Supabase client configurations in `src/utils/supabase/` for server, client, and middleware
- Auth utilities in `src/lib/auth.ts` provide error handling and validation

**Database Schema** (`src/types/database.ts`):
- Type-safe database interfaces for Users, Companies, and Jobs
- Supports Full-Time, Part-Time, and Contract job types
- Foreign key relationships between users, companies, and jobs

**UI Components** (`src/components/`):
- `auth/` - Login forms with skeleton loading states
- `job/` - Job cards and filtering components  
- `navbar/` - Navigation with user dropdown and logout
- `ui/` - Shared UI components (Loading, ErrorDisplay, Footer)

### Development Patterns

- **Loading States**: Each page has corresponding `loading.tsx` with skeleton components
- **Server Components**: Default pattern with Server Actions for data mutations
- **Error Handling**: Centralized auth error handling with user-friendly messages
- **Type Safety**: Database types are imported and used throughout the application
- **Responsive Design**: Mobile-first approach using Tailwind CSS utilities

### Environment Setup

Requires Supabase environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Route Structure

- `/` - Landing page
- `/login` - Authentication
- `/jobs` - Job listings with individual job pages at `/jobs/[id]`
- `/dashboard` - User dashboard with job management
- `/dashboard/post-job` - Job posting form
- `/dashboard/edit-job/[id]` - Job editing interface