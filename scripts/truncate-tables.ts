import { db } from "@/drizzle/db"
import { UserTable } from "@/drizzle/schema/user"
import { JobInfoTable } from "@/drizzle/schema/jobInfo"
import { QuestionTable } from "@/drizzle/schema/question"
import { InterviewTable } from "@/drizzle/schema/interview"
import { sql } from "drizzle-orm"

async function truncateAllTables() {
  try {
    console.log("🗑️ Truncating all tables...")
    
    // Disable foreign key constraints temporarily
    await db.execute(sql`SET session_replication_role = replica`)
    
    // Truncate all tables
    await db.delete(InterviewTable)
    console.log("✅ Truncated interviews table")
    
    await db.delete(QuestionTable)
    console.log("✅ Truncated questions table")
    
    await db.delete(JobInfoTable)
    console.log("✅ Truncated job_info table")
    
    await db.delete(UserTable)
    console.log("✅ Truncated users table")
    
    // Re-enable foreign key constraints
    await db.execute(sql`SET session_replication_role = DEFAULT`)
    
    console.log("🎉 All tables truncated successfully!")
    
  } catch (error) {
    console.error("❌ Error truncating tables:", error)
  } finally {
    process.exit(0)
  }
}

truncateAllTables()