import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // FounderReach is intentionally guest-readable. Keep authenticated writes in
  // the API routes, where Supabase RLS can enforce per-user data ownership.
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = {
  matcher: ["/dashboard/:path*", "/calendar/:path*", "/inbox/:path*", "/data/:path*", "/profile/:path*", "/permissions/:path*"],
};
