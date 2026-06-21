import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "./env-client";

export const supabase = createClient(
  publicEnv.supabaseUrl,
  publicEnv.supabaseAnonKey
);
