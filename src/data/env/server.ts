import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

export const env = createEnv({
  server: {
    // Use Supabase PostgreSQL URLs (use non-pooling for migrations, pooling for runtime)
    POSTGRES_URL_NON_POOLING: z.string().url(),
    POSTGRES_URL: z.string().url().optional(), // Optional pooling URL for runtime
    ARCJET_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    HUME_API_KEY: z.string().min(1),
    HUME_SECRET_KEY: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1).optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
  },
  createFinalSchema: env => {
    return z.object(env).transform(val => {
      return {
        ...val,
        // Use non-pooling URL for DATABASE_URL (better for migrations)
        DATABASE_URL: val.POSTGRES_URL_NON_POOLING,
      }
    })
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})
