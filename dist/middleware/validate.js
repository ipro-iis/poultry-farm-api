export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({ body: req.body, params: req.params, query: req.query });
        next();
    }
    catch (e) {
        console.error("Zod validation error:", e.errors);
        return res.status(400).json({ errors: e.errors });
    }
};
//# sourceMappingURL=validate.js.map