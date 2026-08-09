export function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                error: result.error.issues
                    .map((issue) => issue.message)
                    .join(', '),
            });
            return;
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validate.js.map