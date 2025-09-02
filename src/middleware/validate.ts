import type { ZodObject, ZodRawShape } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodObject<ZodRawShape>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, params: req.params, query: req.query });
    next();
  } catch (e: any) {
    console.error("Zod validation error:", e.errors);
    return res.status(400).json({ errors: e.errors });
  }
};
