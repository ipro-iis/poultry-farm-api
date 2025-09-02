import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config/index.js";

export function signJwt(payload: object, expiresIn: string | number = "7d") {
  const secret: Secret = config.jwtSecret;

  // Narrow the type so it's exactly number | StringValue
  const exp = expiresIn as NonNullable<SignOptions["expiresIn"]>;

  return jwt.sign(payload, secret, { expiresIn: exp });
}

export function verifyJwt<T>(token: string): T {
  const secret: Secret = config.jwtSecret;
  return jwt.verify(token, secret) as T;
}
