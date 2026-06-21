function requiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  supabaseUrl: requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseServiceRoleKey: requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  resendApiKey: process.env.RESEND_API_KEY?.trim() || "",
  resendFromEmail:
    process.env.RESEND_FROM_EMAIL?.trim() || "FEDUP <noreply@feduptv.com>",
  portalPassword:
    process.env.PORTAL_PASSWORD?.trim() ||
    process.env.NEXT_PUBLIC_PORTAL_PASSWORD?.trim() ||
    "FedUp2026!",
  portalSessionSecret:
    process.env.PORTAL_SESSION_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.PORTAL_PASSWORD?.trim() ||
    process.env.NEXT_PUBLIC_PORTAL_PASSWORD?.trim() ||
    "FedUp2026!",
};
