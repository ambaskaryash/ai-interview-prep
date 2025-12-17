import { config } from "dotenv"

// Load environment variables
config({ path: ".env.local" })

export default {
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL_NON_POOLING!,
    ssl: {
      rejectUnauthorized: false, // For Supabase SSL issues
    },
  },
}
