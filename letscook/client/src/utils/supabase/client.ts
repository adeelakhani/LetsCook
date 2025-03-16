import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>

  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          return fetch(url, {
            ...options,
            credentials: 'include', // Important for cross-origin requests with cookies
          });
        },
      },
    }
  );