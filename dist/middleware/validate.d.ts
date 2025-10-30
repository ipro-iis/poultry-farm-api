import type { ZodObject, ZodRawShape } from "zod";
import type { Request, Response, NextFunction } from "express";
export declare const validate: (schema: ZodObject<ZodRawShape>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.d.ts.map