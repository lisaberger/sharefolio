import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '../config/env.js';

/* HMAC-signed session token: base64url(payload).signature */
const PAYLOAD_SEPARATOR = '.';

interface TokenPayload {
    sub: string;
    exp: number;
}

const encode = (data: unknown): string =>
    Buffer.from(JSON.stringify(data)).toString('base64url');

const decode = <T>(value: string): T =>
    JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T;

const sign = (payload: string): string =>
    createHmac('sha256', env.SESSION_SECRET).update(payload).digest('base64url');

export function issueToken(userId: string): string {
    const payload: TokenPayload = {
        sub: userId,
        exp: Date.now() + env.SESSION_TTL_MS,
    };

    const encoded = encode(payload);
    return `${encoded}${PAYLOAD_SEPARATOR}${sign(encoded)}`;
}

/* returns the user id if the token is valid and not expired, otherwise null */
export function verifyToken(token: string): string | null {
    const [payload, signature] = token.split(PAYLOAD_SEPARATOR);

    if (!payload || !signature) {
        return null;
    }

    const expected = sign(payload);
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    if (
        signatureBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
        return null;
    }

    let data: TokenPayload;
    try {
        data = decode<TokenPayload>(payload);
    } catch {
        return null;
    }

    if (!data.sub || typeof data.exp !== 'number' || data.exp < Date.now()) {
        return null;
    }

    return data.sub;
}
