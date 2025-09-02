import type { Request, Response } from "express";
import * as service from "./daily.service.js";
// import { z } from "zod";
// import { addSchema, startupSchema } from "./daily.schemas.js";

type FarmIdParams = { farmId: string };
type IdParams = { id: string };

// Infer types from Zod
// type AddParams = z.infer<typeof addSchema>["params"];
// type AddBody = z.infer<typeof addSchema>["body"];

// type StartupParams = z.infer<typeof startupSchema>["params"];
// type StartupBody = z.infer<typeof startupSchema>["body"];

export async function list(req: Request<FarmIdParams>, res: Response) {
  const items = await service.listByFarm(req.params.farmId);
  res.json(items);
}

export async function add(req: Request<FarmIdParams>, res: Response) {
  try {
    const payload = {
      ...req.body,
      farmId: req.params.farmId,
      inputDate: new Date(req.body.inputDate),
    };
    const created = await service.add(payload);
    res.json(created);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function update(req: Request<IdParams>, res: Response) {
  const updated = await service.update(req.params.id, req.body);
  res.json(updated);
}

export async function updateAndRecalculateHandler(req: Request<{ id: string }>, res: Response) {
  const updated = await service.updateAndRecalculate(req.params.id, req.body);
  res.json(updated);
}

export async function remove(req: Request<IdParams>, res: Response) {
  await service.remove(req.params.id);
  res.json({ ok: true });
}

export async function addStartupWithDay1(req: Request<FarmIdParams>, res: Response) {
  const { farmId } = req.params;
  const { day0, day1 } = req.body;
  const result = await service.addStartupWithDay1({
    farmId,
    day0,
    day1,
  });
  res.json(result);
}
