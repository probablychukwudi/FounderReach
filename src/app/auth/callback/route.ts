import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");
  const redirectTo = next?.startsWith("/") ? next : "/dashboard";

  if (code) {
    const supabase = getSupabaseServerClient();
    await supabase?.auth.exchangeCodeForSession(code);
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set({ name: "founderreach_guest", value: "", path: "/", maxAge: 0 });
  return response;
}
