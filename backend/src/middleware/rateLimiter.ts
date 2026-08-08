import type { NextFunction, Request, Response } from 'express';

interface Attempt {
    count: number;
    resetAt: number;
}

/* simple in-memory sliding-window rate limiter */
export function createRateLimiter(options: {
    windowMs: number;
    max: number;
    key: (req: Request) => string;
}): (req: Request, res: Response, next: NextFunction) => void {
    const buckets = new Map<string, Attempt>();
    let lastPrune = Date.now();

    return (req: Request, res: Response, next: NextFunction): void => {
        const key = options.key(req);
        const now = Date.now();

        if (now - lastPrune >= options.windowMs) {
            for (const [bucketKey, bucket] of buckets) {
                if (bucket.resetAt < now) {
                    buckets.delete(bucketKey);
                }
            }
            lastPrune = now;
        }

        const bucket = buckets.get(key);

        if (!bucket || bucket.resetAt < now) {
            buckets.set(key, { count: 1, resetAt: now + options.windowMs });
            next();
            return;
        }

        bucket.count += 1;

        if (bucket.count > options.max) {
            res.status(429).json({
                error: 'Too many attempts, please try again later',
            });
            return;
        }

        next();
    };
}
