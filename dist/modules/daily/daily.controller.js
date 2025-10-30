import * as service from "./daily.service.js";
// Infer types from Zod
// type AddParams = z.infer<typeof addSchema>["params"];
// type AddBody = z.infer<typeof addSchema>["body"];
// type StartupParams = z.infer<typeof startupSchema>["params"];
// type StartupBody = z.infer<typeof startupSchema>["body"];
export async function list(req, res) {
    const items = await service.listByFarm(req.params.farmId);
    res.json(items);
}
export async function add(req, res) {
    try {
        const payload = {
            ...req.body,
            farmId: req.params.farmId,
            inputDate: new Date(req.body.inputDate),
        };
        const created = await service.add(payload);
        res.json(created);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}
export async function update(req, res) {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
}
export async function updateAndRecalculateHandler(req, res) {
    const updated = await service.updateAndRecalculate(req.params.id, req.body);
    res.json(updated);
}
export async function remove(req, res) {
    await service.remove(req.params.id);
    res.json({ ok: true });
}
export async function addStartupWithDay1(req, res) {
    const { farmId } = req.params;
    const { day0, day1 } = req.body;
    const result = await service.addStartupWithDay1({
        farmId,
        day0,
        day1,
    });
    res.json(result);
}
//# sourceMappingURL=daily.controller.js.map