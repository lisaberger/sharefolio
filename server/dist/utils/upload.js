import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import multer from 'multer';
import { env } from '../config/env.js';
const uploadsRoot = path.join(env.UPLOAD_DIR, 'projects');
if (!existsSync(uploadsRoot)) {
    mkdirSync(uploadsRoot, { recursive: true });
}
export class UploadValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UploadValidationError';
    }
}
const ALLOWED_MIME_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
]);
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsRoot),
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname) || '.bin';
        cb(null, `${randomUUID()}${extension}`);
    },
});
export const projectUpload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 3,
    },
    fileFilter: (req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
            return cb(new UploadValidationError(`Unsupported file type: ${file.mimetype}`));
        }
        cb(null, true);
    },
});
export const toPublicPath = (filename) => `/public/projects/${filename}`;
//# sourceMappingURL=upload.js.map