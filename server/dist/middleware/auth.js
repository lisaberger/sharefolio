import { verifyToken } from '../utils/token.js';
const BEARER_PATTERN = /^Bearer\s+(.+)$/i;
export function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    const match = header ? header.match(BEARER_PATTERN) : null;
    if (!match) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }
    const userId = verifyToken(match[1]);
    if (!userId) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }
    req.userId = userId;
    next();
}
//# sourceMappingURL=auth.js.map