import { describe, expect, it } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import { createRateLimiter } from '../../src/middleware/rateLimiter.js';

interface MockRes {
    statusCode: number;
    body: unknown;
    status(code: number): MockRes;
    json(data: unknown): MockRes;
}

const makeRes = (): MockRes => ({
    statusCode: 0,
    body: undefined,
    status(code: number) {
        this.statusCode = code;
        return this;
    },
    json(data: unknown) {
        this.body = data;
        return this;
    },
});

const makeReq = (ip = '1.2.3.4'): Request =>
    ({ ip, headers: {} }) as Request;

const run = (
    limiter: ReturnType<typeof createRateLimiter>,
    req: Request,
    res: MockRes
): boolean => {
    let nextCalled = false;
    const next: NextFunction = () => {
        nextCalled = true;
    };
    limiter(req, res as unknown as Response, next);
    return nextCalled;
};

describe('createRateLimiter', () => {
    it('allows requests under the limit', () => {
        const limiter = createRateLimiter({ windowMs: 60000, max: 2, key: (r) => r.ip! });
        const req = makeReq();
        const res = makeRes();

        expect(run(limiter, req, res)).toBe(true);
        expect(run(limiter, req, res)).toBe(true);
    });

    it('rejects requests over the limit with 429', () => {
        const limiter = createRateLimiter({ windowMs: 60000, max: 2, key: (r) => r.ip! });
        const req = makeReq();
        const res = makeRes();

        run(limiter, req, res);
        run(limiter, req, res);
        const allowed = run(limiter, req, res);

        expect(allowed).toBe(false);
        expect(res.statusCode).toBe(429);
    });

    it('tracks clients separately', () => {
        const limiter = createRateLimiter({ windowMs: 60000, max: 1, key: (r) => r.ip! });

        expect(run(limiter, makeReq('10.0.0.1'), makeRes())).toBe(true);
        expect(run(limiter, makeReq('10.0.0.2'), makeRes())).toBe(true);
    });
});
