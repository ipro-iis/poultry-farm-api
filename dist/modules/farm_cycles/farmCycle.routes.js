import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { z } from "zod";
import { validate } from "../../middleware/validate.js";
import * as controller from "./farmCycle.controller.js";
const router = Router({ mergeParams: true }); // mergeParams so :farmId from parent is available
const farmIdParam = z.object({
    params: z.object({
        farmId: z.string().uuid(),
    }),
});
const paramsSchema = z.object({
    params: z.object({
        cycleId: z.string().uuid(),
    }),
});
router.use(requireAuth);
// GET /farms/:farmId/cycles
router.get("/", validate(farmIdParam), controller.listByFarm);
// GET /farm-cycles/:cycleId/daily-inputs
router.get("/:cycleId/daily-inputs", validate(paramsSchema), controller.listByCycle);
router.get("/:farmId/cycles", validate(farmIdParam), controller.listByFarm);
export default router;
//# sourceMappingURL=farmCycle.routes.js.map