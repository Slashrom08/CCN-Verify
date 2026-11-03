import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

// `middleware.ts` (et non `proxy.ts`) : le plugin Netlify Next.js ne bundle pas
// encore le nouveau fichier proxy — même choix que Terra Verify, Sky Verify et Substance.
export const config = {
  matcher: ["/app/:path*", "/api/ccn/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (await verifySessionToken(token)) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
  }
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}
