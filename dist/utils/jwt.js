import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
export function signJwt(payload, expiresIn = "7d") {
    const secret = config.jwtSecret;
    // Narrow the type so it's exactly number | StringValue
    const exp = expiresIn;
    return jwt.sign(payload, secret, { expiresIn: exp });
}
export function verifyJwt(token) {
    const secret = config.jwtSecret;
    return jwt.verify(token, secret);
}
//# sourceMappingURL=jwt.js.map