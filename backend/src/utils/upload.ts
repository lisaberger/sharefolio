import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import multer from 'multer';
import { env } from '../config/env.js';

const uploadsRoot = path.join(env.UPLOAD_DIR, 'projects');

if (!existsSync(uploadsRoot)) {
    mkdirSync(uploadsRoot, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsRoot),
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname) || '.bin';
        cb(null, `${randomUUID()}${extension}`);
    },
});

export const projectUpload = multer({ storage });

export const toPublicPath = (filename: string): string =>
    `/public/projects/${filename}`;
