import type { NextFunction, Request, Response } from 'express';
export interface AuthenticatedRequest extends Request {
    userId?: string;
}
export declare function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
