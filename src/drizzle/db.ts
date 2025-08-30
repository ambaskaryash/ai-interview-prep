
export const db = drizzle(env.DATABASE_URL || "", { schema })
