# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Requirements
Focus on clean code,
usability, and fullstack functionality.

## Development Commands

```bash
# Development server with Turbopack (fast bundler)
npm run dev

# Production build and start
npm run build
npm start

# Code quality
npm run lint
```

## Architecture Overview

This is a **Next.js 15 App Router** job board application with **Supabase** authentication and **TypeScript** throughout.

**Key Technologies:**
- Next.js 15.4.2 with App Router
- React 19.1.0 
- TypeScript 5
- Tailwind CSS 4 + DaisyUI 5.0.46
- Supabase (auth + database)

## Authentication System

**Triple Supabase Client Pattern:**
- `src/utils/supabase/client.ts` - Browser client
- `src/utils/supabase/server.ts` - Server client with cookie handling  
- `src/utils/supabase/middleware.ts` - Middleware-specific client

**Authentication Flow:**
1. Middleware (`src/middleware.ts`) protects routes by redirecting to `/login`
2. Server actions in `src/app/login/actions.tsx` handle login/signup
3. Email confirmation flow via `/auth/confirm-email`
4. Centralized auth utilities in `src/lib/auth.ts`

**Important:** Never wrap `redirect()` calls in try-catch blocks - they throw `NEXT_REDIRECT` errors internally.

## Key Application Structure

```
src/app/
├── auth/confirm-email/    # Email verification
├── dashboard/             # Protected user area
├── jobs/                  # Job browsing
├── login/                 # Auth forms
└── error/                 # Error handling

src/lib/
├── auth.ts               # Auth error handling & validation
├── user.ts               # User profile operations  
└── utils.ts              # Date, UI helpers, validation

src/types/                # TypeScript definitions
```

## Database & Types

- User profiles stored in Supabase with minimal schema (ID, email, created_at)
- Database types should be generated from Supabase schema
- Use `src/lib/user.ts` utilities for profile operations

## Development Patterns

**Server Actions:** Used for form handling (login, signup) - follow patterns in `src/app/login/actions.tsx`

**Component Development:** Use DaisyUI components with Tailwind utility classes

**Error Handling:** Use `handleAuthError()` from `src/lib/auth.ts` for consistent user-friendly messages

**Utilities:** Extensive helper functions in `src/lib/utils.ts` for dates, UI, validation, and text processing

## Environment Setup

Required environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
