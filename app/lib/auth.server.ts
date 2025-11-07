import { redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "./supabase.server";

export async function requireAuth(request: Request) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw redirect("/login", { headers });
  }

  // Create session-like object for backwards compatibility
  const session = { user };

  return { session, supabase, headers };
}

export async function getSession(request: Request) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session, supabase, headers };
}

export async function signUp(
  request: Request,
  email: string,
  password: string,
  fullName: string
) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { error: error.message, headers };
  }

  return { data, headers };
}

export async function signIn(request: Request, email: string, password: string) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message, headers };
  }

  return { data, headers };
}

export async function signOut(request: Request) {
  const { supabase, headers } = createSupabaseServerClient(request);

  await supabase.auth.signOut();

  return redirect("/login", { headers });
}
