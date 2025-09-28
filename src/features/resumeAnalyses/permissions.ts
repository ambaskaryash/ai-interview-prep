import { hasPermission } from "@/services/clerk/lib/hasPermission"

// Made free to use - unlimited resume analysis for everyone
export async function canRunResumeAnalysis() {
  // Always return true to allow unlimited resume analysis
  return true
  
  // Original subscription-based code (commented out):
  // return hasPermission("unlimited_resume_analysis")
}
