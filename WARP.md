# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Database Commands (Drizzle ORM)
- `NODE_TLS_REJECT_UNAUTHORIZED=0 npm run db:push` - Push database schema changes directly to online database
- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:migrate` - Run pending migrations
- `npm run db:studio` - Open Drizzle Studio for database management

### Single Test/Development Workflow
Since this project doesn't include test commands, development workflow focuses on:
- Use `npm run dev` for hot-reload development
- Use `npm run lint` to check code quality before commits
- Use `npm run db:studio` to inspect database during development

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk with subscription-based permissions
- **AI Integration**: Google Gemini (via @ai-sdk/google) for text generation
- **Voice AI**: Hume AI for realistic interview conversations  
- **Security**: Arcjet for rate limiting, bot detection, and request protection
- **UI**: Tailwind CSS with Radix UI components
- **File Handling**: Multi-format resume parsing (PDF, Word, plain text)

### Project Structure

#### Core Architecture Layers
1. **Database Layer** (`src/drizzle/`)
   - Schema definitions with TypeScript types in `schema/` directory
   - Migrations in `migrations/` directory
   - Four main entities: users, job_info, interviews, questions
   - Enum types for experience levels and question difficulties

2. **Feature Layer** (`src/features/`)
   - Feature-based organization: interviews, jobInfos, questions, resumeAnalyses, users
   - Each feature contains: actions (Server Actions), components, database operations, caching, and permissions
   - Permissions system controls access based on Clerk subscription tiers

3. **Services Layer** (`src/services/`)`
   - **AI**: Google Gemini integration for question generation, feedback, and resume analysis
   - **Clerk**: Authentication with custom permission helpers and pricing components
   - **Hume**: Voice AI integration for conversational interviews
   - Service-specific components and utilities

4. **App Layer** (`src/app/`)
   - Next.js App Router structure with nested layouts
   - API routes in `api/` for AI operations and Clerk webhooks
   - Main application routes in `app/` subdirectory
   - Landing page with features, testimonials, and pricing

5. **Data Layer** (`src/data/`)
   - Environment variable management with runtime validation using `@t3-oss/env-nextjs`
   - Separate client/server environment configurations

### Key Architectural Patterns

#### Database Design
The application centers around job preparation with this entity relationship:
- **Users** (Clerk-managed) have multiple **JobInfo** records
- **JobInfo** contains job details (title, description, experience level) and has many **Questions** and **Interviews**
- **Questions** are AI-generated based on job requirements and difficulty (easy/medium/hard)
- **Interviews** store voice conversation data, duration, Hume chat IDs, and AI-generated feedback

#### AI Integration Architecture
- **Question Generation**: Uses job description + difficulty level to generate technical interview questions with Gemini
- **Question Feedback**: Evaluates user answers with 1-10 ratings and improvement suggestions
- **Resume Analysis**: Multi-format file parsing with ATS compatibility scoring and keyword optimization
- **Voice Interviews**: Hume AI integration for realistic conversation practice with feedback generation

#### Security & Rate Limiting
- **Arcjet Integration**: Comprehensive protection with token bucket rate limiting, bot detection, and request shielding
- **Middleware Protection**: Global rate limiting (100 req/min), authentication enforcement on protected routes
- **Feature-Level Rate Limits**: Interview creation limited to 12 per day per user
- **File Upload Security**: 10MB limit, type validation for resume uploads

#### Permission & Subscription System
Features are gated by Clerk-based subscription permissions:
- **Free tier**: Limited to 5 questions total
- **Premium tiers**: Unlimited questions and advanced features
- Permission checks in `src/features/*/permissions.ts` using `hasPermission()`
- Subscription management with pricing table component

#### Caching Strategy  
- Uses Next.js 15 `"use cache"` directive with custom cache tags
- Feature-specific cache invalidation patterns (e.g., `revalidateQuestionCache`)
- Cache tags follow pattern: `${feature}_${entityId}` for granular invalidation
- Database queries cached with automatic revalidation on mutations

#### State Management
- Server Components for data fetching with built-in caching
- Client Components for interactivity (forms, real-time AI streaming responses)
- Form handling with react-hook-form and Zod validation
- Real-time AI streaming using `@ai-sdk/react` hooks

### Key Features Implementation

#### AI-Powered Question Generation
- Context-aware questions based on job description and experience level
- Difficulty-based generation with conversation history context
- Streaming responses for real-time user feedback
- Markdown-formatted questions with code snippets when appropriate

#### Resume Analysis System
- Multi-format file support (PDF, Word, plain text)
- Structured AI analysis across 5 categories: ATS compatibility, job match, writing/formatting, keyword coverage, other insights
- Drag-and-drop upload interface with progress indicators
- Detailed feedback with strength/improvement classifications

#### Voice Interview Practice
- Hume AI integration for natural conversation flow
- Real-time voice interaction with AI interviewer
- Session recording and feedback generation
- Duration tracking and conversation condensation

### Environment Configuration
Environment variables are managed through `src/data/env/` with runtime validation:

**Server-side variables:**
- Database: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (combined into `DATABASE_URL`)
- AI: `GEMINI_API_KEY`, `HUME_API_KEY`, `HUME_SECRET_KEY`
- Authentication: `CLERK_SECRET_KEY`
- Security: `ARCJET_KEY`

**Client-side variables:**
- Clerk: `NEXT_PUBLIC_CLERK_*` configuration
- Hume: `NEXT_PUBLIC_HUME_CONFIG_ID`

### Development Patterns
- Feature directories contain all related code (actions, components, database operations, caching, permissions)
- API routes follow RESTful patterns with streaming responses for AI operations
- TypeScript strict mode with Drizzle ORM providing full type safety
- Server Actions for data mutations with error handling and validation
- Progressive enhancement with loading states and optimistic updates
- Comprehensive error handling with user-friendly messages via Sonner toasts

### File Upload Handling
- Secure file upload with type and size validation
- FormData handling for multipart requests
- Support for PDF, Word documents (.doc/.docx), and plain text
- Client-side drag-and-drop with visual feedback
- Server-side processing with streaming AI analysis responses
