import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient can only be called in the browser");
  }

  if (!client) {
    client = createBrowserClient<Database>(
      window.ENV.SUPABASE_URL,
      window.ENV.SUPABASE_ANON_KEY
    );
  }

  return client;
}

declare global {
  interface Window {
    ENV: {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
    };
  }
}
