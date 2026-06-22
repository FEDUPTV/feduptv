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
  portalDisabled: process.env.PORTAL_DISABLED?.trim() === "true",
  portalPassword: process.env.PORTAL_PASSWORD?.trim() || "",
  portalSessionSecret: process.env.PORTAL_SESSION_SECRET?.trim() || "",
};
