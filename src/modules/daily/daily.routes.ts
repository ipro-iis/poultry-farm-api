import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { z } from "zod";
import { validate } from "../../middleware/validate.js";
import { add, list, remove, update } from "./daily.controller.js";

const farmParam = z.object({ params: z.object({ farmId: z.string().uuid() }) });

const addSchema = z.object({
  params: z.object({ farmId: z.uuid() }),
  body: z.object({
    id: z.string().optional().nullable(),
    farmId: z.string().optional(),
    inputDate: z.string(),
    dayIndex: z.number().int().min(0),
    feedName: z.string().optional().nullable(),
    feedData: z.any().optional().nullable(),
    deathWithLossQty: z.number().int().min(0).optional(),
    deathWithoutLoss: z.any().optional().nullable(),
    discard: z.any().optional().nullable(),
    sale: z.any().optional().nullable(),
    charcoal: z.any().optional().nullable(),
    riceHusk: z.any().optional().nullable(),
    sugar: z.any().optional().nullable(),
    medicine: z.any().optional().nullable(),
    laborFee: z.number().min(0).optional(),
    balanceQty: z.int().min(0),
    balanceWeight: z.number().min(0),
    remark: z.string().optional().nullable().or(z.literal("")),
  }),
});

const idParam = z.object({ params: z.object({ id: z.string().uuid() }) });

const router = Router();
router.use(requireAuth);

router.get("/:farmId", validate(farmParam), list);
router.post("/:farmId", validate(addSchema), add);
router.patch("/:id", validate(idParam), update);
router.delete("/:id", validate(idParam), remove);

export default router;
