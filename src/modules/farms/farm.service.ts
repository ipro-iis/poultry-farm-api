import { prisma } from "../../prisma/client.js";
import type { FarmStatus } from "@prisma/client";

interface StartFarmInput {
  farmId: string;
  companyId: string;
  startDate: Date;
  initialAmount: number;
  remark?: string;
}

export function list(companyId: string) {
  return prisma.farm.findMany({ where: { companyId } });
}

export function create(companyId: string, farmNo: string) {
  return prisma.farm.create({ data: { companyId, farmNo } });
}

export function update(id: string, data: { farmNo?: string; status?: FarmStatus }) {
  return prisma.farm.update({ where: { id }, data });
}

export async function remove(id: string, companyId: string) {
  const farm = await prisma.farm.findUnique({ where: { id } });
  if (!farm || farm.companyId !== companyId) throw new Error("Not found");
  const usedDaily = await prisma.dailyInput.findFirst({ where: { farmId: id } });
  if (usedDaily) throw new Error("Cannot delete farm with daily inputs");
  await prisma.farm.delete({ where: { id } });
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
