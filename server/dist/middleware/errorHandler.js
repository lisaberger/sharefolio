import multer from 'multer';
import { UploadValidationError } from '../utils/upload.js';
export function errorHandler(err, req, res, next) {
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
//# sourceMappingURL=errorHandler.js.map