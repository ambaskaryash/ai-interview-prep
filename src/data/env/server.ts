import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

export const DATABASE_URL = process.env.POSTGRES_URL

export const env = createEnv({
  server: {
    ARCJET_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    HUME_API_KEY: z.string().min(1),
    HUME_SECRET_KEY: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
  },
  createFinalSchema: env => {
    return z.object(env).transform(val => {
      return {
        ...val,
        DATABASE_URL: process.env.POSTGRES_URL,
      }
    })
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})
