# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Database Commands (Drizzle ORM)
- `NODE_TLS_REJECT_UNAUTHORIZED=0 npm run db:push` - Push database schema changes directly to online database (SSL bypass for development)
- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:migrate` - Run pending migrations
- `npm run db:studio` - Open Drizzle Studio for database management

### Local Development Setup
- `docker compose up -d` - Start local PostgreSQL database with Docker
- `node scripts/reset-database.js` - Completely reset database (drops all tables and types)
- `node scripts/create-dev-user.js` - Create development user for testing
- `node scripts/test-db.js` - Test database connectivity
- `node scripts/truncate-tables.ts` - Clear all data while preserving schema

### Development Workflow
**Local Development Setup:**
1. Copy `.env.local` with required environment variables
2. Start local database: `docker compose up -d` (or use remote database)
3. Push schema: `NODE_TLS_REJECT_UNAUTHORIZED=0 npm run db:push`
4. Create dev user: `node scripts/create-dev-user.js` (if needed)
5. Start development: `npm run dev`

**Daily Development:**
- Use `npm run dev` for hot-reload development with Turbopack
- Use `npm run lint` to check code quality before commits
- Use `npm run db:studio` to inspect database during development
- Reset database when needed: `node scripts/reset-database.js`

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack (experimental useCache enabled)
- **Database**: PostgreSQL 17.0 with Drizzle ORM and TypeScript schema validation
- **Authentication**: Clerk with feature-based subscription permissions
- **AI Integration**: Google Gemini (via @ai-sdk/google) with streaming response support
- **Voice AI**: Hume AI for realistic interview conversations and feedback generation
- **Security**: Arcjet for comprehensive protection (rate limiting, bot detection, shield mode)
- **UI**: Tailwind CSS with Radix UI components and dark/light theme support
- **File Handling**: Multi-format resume parsing with AI-powered analysis
- **Development**: Docker Compose for local PostgreSQL, custom database management scripts

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
   - **API Routes**: Streaming AI endpoints and webhook handlers
     - `api/ai/questions/generate-question` - Real-time question generation with streaming
     - `api/ai/questions/generate-feedback` - AI-powered answer evaluation
     - `api/ai/resumes/analyze` - Multi-format resume analysis with streaming
     - `api/webhooks/clerk` - User authentication lifecycle management
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

**Database Configuration:**
- For **remote databases**: `POSTGRES_URL_NON_POOLING` (primary connection string)
- For **local development**: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (Docker Compose setup)
- **SSL handling**: Use `NODE_TLS_REJECT_UNAUTHORIZED=0` for development databases with SSL issues

**Server-side variables:**
- AI Services: `GEMINI_API_KEY`, `HUME_API_KEY`, `HUME_SECRET_KEY`
- Authentication: `CLERK_SECRET_KEY`
- Security: `ARCJET_KEY`

**Client-side variables:**
- Clerk: `NEXT_PUBLIC_CLERK_*` configuration (publishable key, sign-in/up URLs)
- Hume: `NEXT_PUBLIC_HUME_CONFIG_ID`

### Development Patterns
- Feature directories contain all related code (actions, components, database operations, caching, permissions)
- API routes follow RESTful patterns with streaming responses for AI operations
- TypeScript strict mode with Drizzle ORM providing full type safety
- Server Actions for data mutations with error handling and validation
- Progressive enhancement with loading states and optimistic updates
- Comprehensive error handling with user-friendly messages via Sonner toasts

### File Upload Handling
- **Security**: 10MB file size limit, strict MIME type validation
- **Supported formats**: PDF, Word documents (.doc/.docx), plain text
- **FormData processing**: Multipart request handling in API routes
- **Client-side**: Drag-and-drop interface with progress indicators
- **Server-side**: Streaming AI analysis responses via `toTextStreamResponse()`

### Development Scripts & Utilities
**Database Management Scripts** (`scripts/` directory):
- `create-dev-user.js` - Creates development user with hardcoded Clerk ID for testing
- `reset-database.js` - Complete database reset (drops tables, enums, and constraints)
- `test-db.js` - Database connectivity testing utility
- `truncate-tables.ts` - Data cleanup while preserving schema

**Docker Development Setup**:
- `docker-compose.yml` - Local PostgreSQL 17.0 setup with environment variable configuration
- Uses environment variables for database credentials and connection settings
- Persistent data storage via Docker volumes (`pgdata`)

### API Architecture Patterns
**Streaming AI Endpoints**:
- Use `createDataStreamResponse()` from AI SDK for real-time responses
- Implement `onFinish` callbacks for database persistence after AI completion
- Support `mergeIntoDataStream()` for combining AI streams with metadata
- Permission checks and rate limiting applied before AI processing

**Error Handling Strategy**:
- Standardized error responses with appropriate HTTP status codes
- Permission validation returns 403 with `PLAN_LIMIT_MESSAGE` for subscription limits
- File validation includes size limits and MIME type checking
- Database constraint violations handled gracefully with user-friendly messages
