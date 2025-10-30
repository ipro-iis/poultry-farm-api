import { prisma } from "../../prisma/client.js";
export function list(companyId) {
    return prisma.farm.findMany({ where: { companyId, isInactive: false }, orderBy: { farmNo: "asc" } });
}
export function create(companyId, farmNo, remark) {
    return prisma.farm.create({ data: { companyId, farmNo, remark } });
}
export function update(id, data) {
    return prisma.farm.update({ where: { id }, data });
}
export async function remove(id, companyId) {
    const farm = await prisma.farm.findUnique({ where: { id } });
    if (!farm || farm.companyId !== companyId)
        throw new Error("Not found");
    const usedDaily = await prisma.dailyInput.findFirst({ where: { farmId: id } });
    if (usedDaily)
        throw new Error("Cannot delete farm with daily inputs");
    await prisma.farm.delete({ where: { id } });
}
export async function closeFarm(id, companyId) {
    // 1️⃣ Verify farm exists and belongs to the company
    const farm = await prisma.farm.findUnique({ where: { id } });
    if (!farm || farm.companyId !== companyId) {
        throw new Error("Not found");
    }
    return prisma.$transaction(async (tx) => {
        // 2️⃣ Find the active cycle for this farm
        const activeCycle = await tx.farmCycle.findFirst({
            where: { farmId: id, isActive: true },
        });
        if (!activeCycle) {
            throw new Error("No active cycle found for this farm");
        }
        // 3️⃣ Mark the cycle as ended
        await tx.farmCycle.update({
            where: { id: activeCycle.id },
            data: {
                endDate: new Date(),
                isActive: false,
            },
        });
        // 4️⃣ Update farm status to available
        const updatedFarm = await prisma.farm.update({
            where: { id },
            data: { status: "available" },
        });
        return updatedFarm;
    });
}
export async function removeFarm(id, companyId) {
    // 1️⃣ Verify farm exists and belongs to the company
    const farm = await prisma.farm.findUnique({ where: { id } });
    if (!farm || farm.companyId !== companyId) {
        throw new Error("Not found");
    }
    // 2️⃣ Count related cycles and daily inputs
    const [cycleCount, dailyCount] = await Promise.all([prisma.farmCycle.count({ where: { farmId: id } }), prisma.dailyInput.count({ where: { farmId: id } })]);
    // 3️⃣ If no cycles and no daily inputs → safe to delete
    if (cycleCount === 0 && dailyCount === 0) {
        return prisma.farm.delete({ where: { id } });
    }
    // 4️⃣ Otherwise → mark as inactive
    return prisma.farm.update({
        where: { id },
        data: { isInactive: true },
    });
    // return prisma.farm.update({
    //   where: { id },
    //   data: { isInactive: true },
    // });
}
// ✅ New startFarm service
// export async function startFarm({ farmId, companyId, startDate, initialAmount, remark }: StartFarmInput) {
//   return prisma.$transaction(async (tx) => {
//     const farm = await tx.farm.findUnique({ where: { id: farmId } });
//     if (!farm || farm.companyId !== companyId) {
//       throw new Error("Not found");
//     }
//     if (farm.status !== "available") {
//       throw new Error("Farm is not available to start");
//     }
//     // Update farm status
//     await tx.farm.update({
//       where: { id: farmId },
//       data: { status: "using" },
//     });
//     // Create Day 0 daily input
//     const created = await tx.dailyInput.create({
//       data: {
//         farmId,
//         inputDate: startDate,
//         dayIndex: 0,
//         feedName: "Initial Stock",
//         deathWithLossQty: 0,
//         feedData: {},
//         deathWithoutLoss: {},
//         discard: {},
//         sale: {},
//         charcoal: {},
//         riceHusk: {},
//         sugar: {},
//         medicine: {},
//         laborFee: 0,
//         balanceQty: initialAmount,
//         balanceWeight: 0,
//         remark: remark ?? null,
//       },
//     });
//     return created;
//   });
// }
//# sourceMappingURL=farm.service.js.map