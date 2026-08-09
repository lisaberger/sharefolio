import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
export declare function validateBody(schema: ZodType): (req: Request, res: Response, next: NextFunction) => void;
