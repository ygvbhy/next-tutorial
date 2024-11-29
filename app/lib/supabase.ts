import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// ServerActions, RouterHandler
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = cookies();

  return createServerClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (key) => (await cookieStore).get(key)?.value,
        set: async (key, value, options) => {
          if (serverComponent) return;
          (await cookieStore).set(key, value, options);
        },
        remove: async (key, options) => {
          if (serverComponent) return;
          (await cookieStore).set(key, "", options);
        },
      },
    }
  );
};
