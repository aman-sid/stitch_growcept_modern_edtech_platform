const AUTH_SECRET =
  process.env.AUTH_SECRET || "100x-minds-super-secure-admin-secret-key-2025";

export const DEFAULT_ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "admin@100xminds.ai";
export const DEFAULT_ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "admin100x";

export interface AdminSession {
  email: string;
  role: string;
  exp: number;
}

function base64UrlEncode(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64").toString("utf8");
  }
  return atob(base64);
}

export async function signToken(payload: { email: string; role: string }): Promise<string> {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days validity
  const body = base64UrlEncode(JSON.stringify({ ...payload, exp }));
  const data = `${header}.${body}`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );

  let binary = "";
  const bytes = new Uint8Array(signatureBuffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const signature = base64UrlEncode(binary);

  return `${data}.${signature}`;
}

export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const data = `${header}.${body}`;
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(AUTH_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Decode signature to Uint8Array
    const rawSig = base64UrlDecode(signature);
    const sigBytes = new Uint8Array(rawSig.length);
    for (let i = 0; i < rawSig.length; i++) {
      sigBytes[i] = rawSig.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(data)
    );

    if (!isValid) return null;

    const decodedBody = JSON.parse(base64UrlDecode(body)) as AdminSession;

    if (decodedBody.exp && decodedBody.exp < Date.now()) {
      return null;
    }

    return decodedBody;
  } catch (err) {
    return null;
  }
}

