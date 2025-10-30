import * as service from "./farm.service.js";
export async function list(req, res) {
    const user = req.user;
    const farms = await service.list(user.id);
    res.json(farms);
}
export async function create(req, res) {
    const user = req.user;
    const farm = await service.create(user.id, req.body.farmNo, req.body.remark);
    res.json(farm);
}
export async function update(req, res) {
    const data = {};
    if (req.body.farmNo)
        data.farmNo = req.body.farmNo;
    if (req.body.remark)
        data.remark = req.body.remark;
    if (req.body.status)
        data.status = req.body.status;
    const farm = await service.update(req.params.id, data);
    res.json(farm);
}
export async function remove(req, res) {
    const user = req.user;
    await service.remove(req.params.id, user.id);
    res.json({ ok: true });
}
export async function closeFarm(req, res) {
    const user = req.user;
    const farm = await service.closeFarm(req.params.id, user.id);
    res.json(farm);
}
export async function removeFarm(req, res) {
    const user = req.user;
    const farm = await service.removeFarm(req.params.id, user.id);
    res.json(farm);
}
// export async function startFarm(req: Request<IdParams>, res: Response) {
//   try {
//     const user = req.user as any; // from requireAuth
//     const { id } = req.params;
//     const { startDate, initialAmount, remark } = req.body;
//     const created = await service.startFarm({
//       farmId: id,
//       companyId: user.id,
//       startDate: new Date(startDate),
//       initialAmount,
//       remark,
//     });
//     res.json(created);
//   } catch (err) {
//     // next(err);
//   }
// }
// export async function setFarmStatus(req: Request, res: Response) {
//   const { id } = req.params;
//   const { status } = req.body;
//   if (!status) {
//     return res.status(400).json({ error: 'Status is required' });
//   }
//   try {
//     const updated = await service.update({
//       where: { id },
//       data: { status },
//     });
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to update farm status' });
//   }
// }
//# sourceMappingURL=farm.controller.js.map