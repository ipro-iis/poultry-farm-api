import type { Request, Response } from "express";
import * as service from "./auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const result = await service.register(req.body);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = await service.login(req.body.phoneNo, req.body.password);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
