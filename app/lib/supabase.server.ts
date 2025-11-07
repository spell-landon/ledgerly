import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export function createSupabaseServerClient(request: Request) {
  const headers = new Headers();

  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );

  return { supabase, headers };
}

// Create a service role client that bypasses RLS (for public invoice access)
export function createSupabaseServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY not set, using anon key");
    // Fallback to anon key if service role key not available
    return createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
  }

  return createClient<Database>(
    process.env.SUPABASE_URL!,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
