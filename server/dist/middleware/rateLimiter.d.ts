import type { NextFunction, Request, Response } from 'express';
export declare function createRateLimiter(options: {
    windowMs: number;
    max: number;
    key: (req: Request) => string;
}): (req: Request, res: Response, next: NextFunction) => void;
