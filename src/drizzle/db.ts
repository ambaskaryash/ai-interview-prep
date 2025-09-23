import { env } from "@/data/env/server"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "@/drizzle/schema"

// Handle SSL certificate issues for production databases
if (process.env.NODE_ENV === "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
}

// Create connection pool with SSL configuration
// Handle self-signed certificates in production (common with Supabase/managed databases)
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" 
    ? { rejectUnauthorized: false } // Accept self-signed certificates in production
    : { rejectUnauthorized: false }, // Disable SSL verification in development
})

export const db = drizzle(pool, { schema })
