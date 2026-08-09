import { describe, expect, it } from 'vitest';
import { createHmac } from 'node:crypto';
import { issueToken, verifyToken } from '../../src/utils/token.js';

describe('token', () => {
    it('issues a token that verifies back to the user id', () => {
        const token = issueToken('67c65d60-31e9-4851-a86e-20f13fc53205');

        expect(typeof token).toBe('string');
        expect(token).toContain('.');
        expect(verifyToken(token)).toBe(
            '67c65d60-31e9-4851-a86e-20f13fc53205'
        );
    });

    it('rejects a tampered token', () => {
        const token = issueToken('some-user');

        /* flip one character in the payload part */
        const [payload, signature] = token.split('.');
        const flipped = payload.slice(0, 2) + (payload[2] === 'A' ? 'B' : 'A') + payload.slice(3);

        expect(verifyToken(`${flipped}.${signature}`)).toBeNull();
    });

    it('rejects a malformed token', () => {
        expect(verifyToken('no-dots-here')).toBeNull();
        expect(verifyToken('')).toBeNull();
        expect(verifyToken('a.b.c')).toBeNull();
    });

    it('rejects an expired token', () => {
        /* build an already-expired token by signing a past payload */
        const payload = Buffer.from(
            JSON.stringify({ sub: 'user', exp: Date.now() - 1000 })
        ).toString('base64url');
        const signature = createHmac('sha256', 'change-me-please-dev-secret')
            .update(payload)
            .digest('base64url');

        expect(verifyToken(`${payload}.${signature}`)).toBeNull();
    });
});
