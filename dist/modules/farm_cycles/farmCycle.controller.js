import * as service from "./farmCycle.service.js";
export async function listByFarm(req, res) {
    const user = req.user;
    const cycles = await service.listByFarm(req.params.farmId, user.id);
    res.json(cycles);
}
export async function listByCycle(req, res) {
    const user = req.user;
    const items = await service.listByCycle(req.params.cycleId, user.id);
    res.json(items);
}
//# sourceMappingURL=farmCycle.controller.js.map