import type { NextFunction, Request, Response } from 'express';

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const error =
        err instanceof Error ? err : new Error(String(err));

    console.error(error);

    res.status(500).json({
        error: error.message || 'Internal Server Error',
    });
}
