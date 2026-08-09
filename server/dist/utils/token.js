import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '../config/env.js';
/* HMAC-signed session token: base64url(payload).signature */
const PAYLOAD_SEPARATOR = '.';
const encode = (data) => Buffer.from(JSON.stringify(data)).toString('base64url');
const decode = (value) => JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
const sign = (payload) => createHmac('sha256', env.SESSION_SECRET).update(payload).digest('base64url');
export function issueToken(userId) {
    const payload = {
        sub: userId,
        exp: Date.now() + env.SESSION_TTL_MS,
    };
    const encoded = encode(payload);
    return `${encoded}${PAYLOAD_SEPARATOR}${sign(encoded)}`;
}
/* returns the user id if the token is valid and not expired, otherwise null */
export function verifyToken(token) {
    const [payload, signature] = token.split(PAYLOAD_SEPARATOR);
    if (!payload || !signature) {
        return null;
    }
    const expected = sign(payload);
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (signatureBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(signatureBuffer, expectedBuffer)) {
        return null;
    }
    let data;
    try {
        data = decode(payload);
    }
    catch {
        return null;
    }
    if (!data.sub || typeof data.exp !== 'number' || data.exp < Date.now()) {
        return null;
    }
    return data.sub;
}
//# sourceMappingURL=token.js.map