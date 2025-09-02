import type { Request, Response } from "express";
import * as service from "./daily.service.js";

type FarmIdParams = { farmId: string };
type IdParams = { id: string };

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

export async function remove(req: Request<IdParams>, res: Response) {
  await service.remove(req.params.id);
  res.json({ ok: true });
}
