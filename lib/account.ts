import { PLAN_BY_ID, type PlanId } from "@/lib/pricing";

export const ACCOUNT_FIELD =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand-light";

export const ACCOUNT_BUTTON =
  "inline-flex w-full items-center justify-center rounded-full bg-brand-deep px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60";

export function isPlanId(value: string | null): value is PlanId {
  return Boolean(value && value in PLAN_BY_ID);
}

export function friendlyAccountError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "The email or password is incorrect.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Please verify your email before signing in.";
  }
  if (normalized.includes("user already registered")) {
    return "An account already exists for this email. Try signing in instead.";
  }
  if (
    normalized.includes("database error saving new user") ||
    normalized.includes("promo") ||
    normalized.includes("invalid, expired")
  ) {
    return "That promo code is invalid, expired, or unavailable for this service.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }

  return message || "Something went wrong. Please try again.";
}
