import type { Request, Response } from "express";
import * as service from "./farmCycle.service.js";

type FarmIdParams = { farmId: string };

export async function listByFarm(req: Request<FarmIdParams>, res: Response) {
  const user = req.user as any;
  const cycles = await service.listByFarm(req.params.farmId, user.id);
  res.json(cycles);
}

type CycleIdParams = { cycleId: string };

export async function listByCycle(req: Request<CycleIdParams>, res: Response) {
  const user = req.user as any;
  const items = await service.listByCycle(req.params.cycleId, user.id);
  res.json(items);
}
