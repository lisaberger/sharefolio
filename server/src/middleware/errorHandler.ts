import multer from 'multer';
import type { NextFunction, Request, Response } from 'express';
import { UploadValidationError } from '../utils/upload.js';

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });
        return;
    }

    if (err instanceof UploadValidationError) {
        res.status(400).json({ error: err.message });
        return;
    }

    const error = err instanceof Error ? err : new Error(String(err));

    console.error(error);

    res.status(500).json({
        error: error.message || 'Internal Server Error',
    });
}
