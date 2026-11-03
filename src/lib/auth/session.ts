// Web Crypto uniquement (pas de `node:crypto`) : importé à la fois par le
// middleware (runtime Edge) et par les routes API (runtime Node).

export const SESSION_COOKIE_NAME = "ccn_session";
export const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 jours

const encoder = new TextEncoder();

interface SessionPayload {
  u: string;
  exp: number; // epoch en secondes
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const padLength = (4 - (value.length % 4)) % 4;
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLength);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function getSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (!secret) throw new Error("Configuration serveur incomplète : AUTH_SESSION_SECRET manquant.");
  return secret;
}

async function getHmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", encoder.encode(getSecret()), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

export async function createSessionToken(username: string): Promise<string> {
  const payload: SessionPayload = { u: username, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS };
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await getHmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  return `${payloadB64}.${base64UrlEncode(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payloadB64, signatureB64] = token.split(".");
  if (!payloadB64 || !signatureB64) return false;
  try {
    const key = await getHmacKey();
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(signatureB64) as BufferSource,
      encoder.encode(payloadB64),
    );
    if (!ok) return false;
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64))) as SessionPayload;
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
