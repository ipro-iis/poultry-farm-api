import type { Request, Response } from "express";
type IdParams = {
    id: string;
};
export declare function list(req: Request, res: Response): Promise<void>;
export declare function create(req: Request, res: Response): Promise<void>;
export declare function update(req: Request<IdParams>, res: Response): Promise<void>;
export declare function remove(req: Request<IdParams>, res: Response): Promise<void>;
export declare function closeFarm(req: Request<IdParams>, res: Response): Promise<void>;
export declare function removeFarm(req: Request<IdParams>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=farm.controller.d.ts.map