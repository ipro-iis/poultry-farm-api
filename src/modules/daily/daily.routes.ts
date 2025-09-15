import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { z } from "zod";
import { validate } from "../../middleware/validate.js";
import { add, list, remove, update, addStartupWithDay1, updateAndRecalculateHandler } from "./daily.controller.js";
import { addSchema, startupSchema } from "./daily.schemas.js";

const farmParam = z.object({ params: z.object({ farmId: z.string().uuid() }) });

// const dailyBodySchema = z.object({
//   id: z.string().optional().nullable(),
//   farmId: z.string().optional(),
//   inputDate: z.string(),
//   dayIndex: z.number().int().min(0),
//   chicken: z.any().optional().nullable(),
//   deathLoss: z.any().optional().nullable(),
//   deathSale: z.any().optional().nullable(),
//   discardSale: z.any().optional().nullable(),
//   goodSale: z.any().optional().nullable(),
//   chickenManure: z.any().optional().nullable(),
//   pesticides: z.any().optional().nullable(),
//   riceHusk: z.any().optional().nullable(),
//   charcoal: z.any().optional().nullable(),
//   sugar: z.any().optional().nullable(),
//   food: z.any().optional().nullable(),
//   medicine: z.any().optional().nullable(),
//   strengthMedicine: z.any().optional().nullable(),
//   vaccine: z.any().optional().nullable(),
//   laborFee: z.any().optional().nullable(),
//   other: z.any().optional().nullable(),
//   // feedName: z.string().optional().nullable(),
//   // feedData: z.any().optional().nullable(),
//   // deathWithLossQty: z.number().int().min(0).optional(),
//   // deathWithoutLoss: z.any().optional().nullable(),
//   // discard: z.any().optional().nullable(),
//   // sale: z.any().optional().nullable(),
//   // charcoal: z.any().optional().nullable(),
//   // riceHusk: z.any().optional().nullable(),
//   // sugar: z.any().optional().nullable(),
//   // medicine: z.any().optional().nullable(),
//   // laborFee: z.number().min(0).optional(),
//   // balanceQty: z.number().int().min(0),
//   // balanceWeight: z.number().min(0),
//   remark: z.string().optional().nullable().or(z.literal("")),
// });

// const addSchema = z.object({
//   params: z.object({ farmId: z.string().uuid() }),
//   body: dailyBodySchema,
// });

// const startupSchema = z.object({
//   params: z.object({ farmId: z.string().uuid() }),
//   body: z.object({
//     day0: dailyBodySchema,
//     day1: dailyBodySchema,
//   }),
// });
// const addSchema = z.object({
//   params: z.object({ farmId: z.uuid() }),
//   body: z.object({
//     id: z.string().optional().nullable(),
//     farmId: z.string().optional(),
//     inputDate: z.string(),
//     dayIndex: z.number().int().min(0),
//     feedName: z.string().optional().nullable(),
//     feedData: z.any().optional().nullable(),
//     deathWithLossQty: z.number().int().min(0).optional(),
//     deathWithoutLoss: z.any().optional().nullable(),
//     discard: z.any().optional().nullable(),
//     sale: z.any().optional().nullable(),
//     charcoal: z.any().optional().nullable(),
//     riceHusk: z.any().optional().nullable(),
//     sugar: z.any().optional().nullable(),
//     medicine: z.any().optional().nullable(),
//     laborFee: z.number().min(0).optional(),
//     balanceQty: z.int().min(0),
//     balanceWeight: z.number().min(0),
//     remark: z.string().optional().nullable().or(z.literal("")),
//   }),
// });
// const startupSchema = z.object({
//   params: z.object({ farmId: z.string().uuid() }),
//   body: z.object({
//     day0: z.any(), // you can replace with a stricter schema if desired
//     day1: z.any(),
//   }),
// });

const idParam = z.object({ params: z.object({ id: z.string().uuid() }) });

const router = Router();
router.use(requireAuth);

router.get("/:farmId", validate(farmParam), list);
router.post("/:farmId", validate(addSchema), add);
// ✅ New startup route
router.post("/:farmId/startup", validate(startupSchema), addStartupWithDay1);
router.patch("/:id", validate(idParam), update);
router.patch("/:id/recalculate", validate(idParam), updateAndRecalculateHandler);
router.delete("/:id", validate(idParam), remove);

export default router;
