import multer from 'multer';
export declare class UploadValidationError extends Error {
    constructor(message: string);
}
export declare const projectUpload: multer.Multer;
export declare const toPublicPath: (filename: string) => string;
