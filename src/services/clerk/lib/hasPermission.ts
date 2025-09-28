import { auth } from "@clerk/nextjs/server"

type Permission =
  | "unlimited_resume_analysis"
  | "unlimited_interviews"
  | "unlimited_questions"
  | "1_interview"
  | "5_questions"

// Made free to use - all features are now available to everyone
export async function hasPermission(permission: Permission) {
  // Always return true to make all features free
  return true
  
  // Original subscription-based code (commented out):
  // const { has } = await auth()
  // return has({ feature: permission })
}
