import { env } from "@/data/env/server"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "@/drizzle/schema"

// Create connection pool with SSL configuration
// In production, SSL works normally. In development, we might need to disable SSL verification
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" 
    ? true // Use proper SSL in production
    : { rejectUnauthorized: false }, // Disable SSL verification in development
})

export const db = drizzle(pool, { schema })
