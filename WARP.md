# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Commands

### Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Operations
```bash
# Push schema changes to database
npm run db:push

# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

### Development Workflow
- Use `npm run dev` for development with Turbopack for faster builds
- Database schema is managed through Drizzle ORM - always use `npm run db:push` after schema changes
- Use `npm run db:studio` to inspect database data visually

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Database**: PostgreSQL with Drizzle ORM (@vercel/postgres)
- **Authentication**: Clerk
- **AI Services**: Google AI SDK (Gemini), Hume AI for voice/emotion analysis
- **UI**: Tailwind CSS with shadcn/ui components
- **Styling**: Tailwind CSS with CSS variables for theming

### Directory Structure

#### Core Application (`src/app/`)
- Landing page and authenticated app routes
- Uses Next.js App Router with nested layouts
- Protected `/app` routes require authentication

#### Feature Modules (`src/features/`)
Each feature follows a consistent pattern:
- `db.ts` - Database operations (insert, update, delete)
- `dbCache.ts` - Next.js cache revalidation helpers
- `actions.ts` - Server actions for forms and mutations
- `permissions.ts` - Authorization logic
- `schemas.ts` - Zod validation schemas

Key Features:
- **Job Infos**: Job descriptions and requirements
- **Interviews**: AI-powered mock interviews with Hume voice analysis
- **Questions**: Technical interview questions with AI feedback
- **Users**: User management and profiles

#### Services (`src/services/`)
- **AI**: Google AI integration for question generation and interview feedback
- **Clerk**: Authentication and user management
- **Hume**: Voice and emotion analysis for interviews

#### Database (`src/drizzle/`)
- Schema definitions split by entity type
- Centralized database client configuration
- Uses Vercel Postgres for production

#### Components (`src/components/`)
- Reusable UI components following shadcn/ui patterns
- Theme-aware components with dark/light mode support

### Key Patterns

#### Database Architecture
- Feature-based table organization (User, JobInfo, Interview, Question)
- Each feature has its own schema file in `src/drizzle/schema/`
- Cache invalidation patterns using Next.js `revalidateTag`
- Optimistic caching with `"use cache"` directive

#### Authentication Flow
- Clerk handles authentication and user management
- Protected routes check `getCurrentUser()` and redirect if needed
- User permissions managed per feature module

#### AI Integration
- Google's Gemini model for text generation (interviews, questions)
- Hume AI for voice analysis and emotional feedback
- Streaming responses for better UX

#### Form Handling
- Server actions for mutations
- Zod schemas for validation
- Optimistic updates with cache revalidation

### Component Architecture
- shadcn/ui for base components
- Compound component patterns (Card + CardHeader + CardContent)
- Suspense boundaries for async data loading
- TypeScript inference from Drizzle schemas

### Environment Configuration
- Split client/server environment handling
- Vercel deployment optimized
- PostgreSQL connection via `@vercel/postgres`

### Development Notes
- Hot reloading with Turbopack in development
- Absolute imports using `@/` path mapping
- TypeScript strict mode enabled
- ESLint and Prettier for code quality

## Key Files

### Configuration
- `next.config.ts` - Next.js configuration with caching enabled
- `drizzle.config.ts` - Database migration configuration
- `components.json` - shadcn/ui configuration
- `tailwind.config.js` - Styling configuration

### Core Database
- `src/drizzle/db.ts` - Main database client
- `src/drizzle/schema.ts` - Schema exports
- `src/drizzle/schema/` - Individual table schemas

### Authentication
- `src/services/clerk/` - Clerk integration and user management

When working with this codebase:
1. Always run database migrations after schema changes
2. Use the established feature module pattern for new functionality
3. Follow the caching patterns with `revalidateTag` for data consistency
4. Leverage TypeScript inference from Drizzle schemas for type safety
5. Use server actions for mutations and client components for interactivity