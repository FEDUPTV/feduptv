function requiredPublicEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const publicEnv = {
  supabaseUrl: requiredPublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: requiredPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
};
