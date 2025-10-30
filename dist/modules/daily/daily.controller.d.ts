import type { Request, Response } from "express";
type FarmIdParams = {
    farmId: string;
};
type IdParams = {
    id: string;
};
export declare function list(req: Request<FarmIdParams>, res: Response): Promise<void>;
export declare function add(req: Request<FarmIdParams>, res: Response): Promise<void>;
export declare function update(req: Request<IdParams>, res: Response): Promise<void>;
export declare function updateAndRecalculateHandler(req: Request<{
    id: string;
}>, res: Response): Promise<void>;
export declare function remove(req: Request<IdParams>, res: Response): Promise<void>;
export declare function addStartupWithDay1(req: Request<FarmIdParams>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=daily.controller.d.ts.map