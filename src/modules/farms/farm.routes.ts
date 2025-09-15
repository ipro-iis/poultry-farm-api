import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { z } from "zod";
import { validate } from "../../middleware/validate.js";
import { create, list, remove, update, closeFarm, removeFarm } from "./farm.controller.js"; //, startFarm
import farmCycleRoutes from "../farm_cycles/farmCycle.routes.js";

const createSchema = z.object({
  body: z.object({ farmNo: z.string().min(1) }),
});

const updateSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    farmNo: z.string().min(1).optional(),
    status: z.enum(["available", "using", "closed"]).optional(),
  }),
});

const idParam = z.object({ params: z.object({ id: z.string().uuid() }) });

const startFarmSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    startDate: z.string(),
    initialAmount: z.number().int().min(1),
    remark: z.string().optional(),
  }),
});

const closeFarmSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});

const router = Router();
router.use(requireAuth);

router.get("/", list);
router.post("/", validate(createSchema), create);
router.patch("/:id", validate(updateSchema), update);
router.delete("/:id", validate(idParam), remove);
router.patch("/:id/close", validate(closeFarmSchema), closeFarm);
router.patch("/:id/remove", validate(closeFarmSchema), removeFarm);
// router.use("/:farmId/cycles", farmCycleRoutes);

// ✅ New start farm route
// router.post("/:id/start", validate(startFarmSchema), startFarm);
// router.patch('/:id/status', setFarmStatus);

export default router;
