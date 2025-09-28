import { toast } from "sonner"

// PLAN_LIMIT_MESSAGE removed - app is now free to use
export const RATE_LIMIT_MESSAGE = "RATE_LIMIT"

export function errorToast(message: string) {
  // Plan limit handling removed - app is now free to use

  if (message === RATE_LIMIT_MESSAGE) {
    toast.error("Woah! Slow down.", {
      description: "You are making too many requests. Please try again later.",
    })
    return
  }

  toast.error(message)
}
