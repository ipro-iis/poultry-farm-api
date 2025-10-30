import type { Request, Response } from "express";
type FarmIdParams = {
    farmId: string;
};
export declare function listByFarm(req: Request<FarmIdParams>, res: Response): Promise<void>;
type CycleIdParams = {
    cycleId: string;
};
export declare function listByCycle(req: Request<CycleIdParams>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=farmCycle.controller.d.ts.map