import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/session";

interface LoginBody {
  username?: string;
  password?: string;
}

// Comparaison à temps constant.
function timingSafeEqual(a: string, b: string): boolean {
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  const length = Math.max(aBytes.length, bBytes.length, 1);
  let diff = aBytes.length === bBytes.length ? 0 : 1;
  for (let i = 0; i < length; i++) diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  return diff === 0;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = checkRateLimit(`login:${ip}`, 8, 5 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  const body = (await request.json().catch(() => null)) as LoginBody | null;
  const username = body?.username ?? "";
  const password = body?.password ?? "";

  const expectedUser = process.env.CCN_AUTH_USER;
  const expectedPassword = process.env.CCN_AUTH_PASSWORD;
  if (!expectedUser || !expectedPassword) {
    return NextResponse.json({ error: "Configuration serveur incomplète : identifiants d'accès non définis." }, { status: 500 });
  }

  if (!(timingSafeEqual(username, expectedUser) && timingSafeEqual(password, expectedPassword))) {
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
  }

  const token = await createSessionToken(username);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
