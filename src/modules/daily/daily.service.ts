import { prisma } from "../../prisma/client.js";
import type { Prisma } from "@prisma/client";

export function listByFarm(farmId: string) {
  return prisma.dailyInput.findMany({
    where: { farmId },
    orderBy: { dayIndex: "asc" },
  });
}

export async function add(input: {
  farmId: string;
  inputDate: Date;
  dayIndex: number;
  feedName?: string | null;
  remark?: string | null;
  deathWithLossQty?: number;
  feedData?: any;
  deathWithoutLoss?: any;
  discard?: any;
  sale?: any;
  charcoal?: any;
  riceHusk?: any;
  sugar?: any;
  medicine?: any;
  laborFee?: number;
}) {
  const last = await prisma.dailyInput.findFirst({
    where: { farmId: input.farmId },
    orderBy: { dayIndex: "desc" },
  });

  if (last) {
    const lastDate = new Date(last.inputDate);
    const expected = new Date(lastDate);
    expected.setDate(lastDate.getDate() + 1);

    const isConsecutive = expected.getFullYear() === input.inputDate.getFullYear() && expected.getMonth() === input.inputDate.getMonth() && expected.getDate() === input.inputDate.getDate();

    if (!isConsecutive) {
      throw new Error(`Input date must be consecutive after ${lastDate.toISOString().slice(0, 10)}`);
    }
  }

  const prevQty = last?.balanceQty ?? 0;
  const prevWt = last?.balanceWeight ?? 0;

  const lossQty = (input.deathWithLossQty ?? 0) + (input.deathWithoutLoss?.qty ?? 0) + (input.discard?.qty ?? 0) + (input.sale?.qty ?? 0);

  const lossWt = (input.deathWithoutLoss?.weight ?? 0) + (input.discard?.weight ?? 0) + (input.sale?.weight ?? 0);

  const nextQty = Math.max(0, prevQty - lossQty);
  const nextWt = Math.max(0, prevWt - lossWt);

  return prisma.dailyInput.create({
    data: {
      farm: { connect: { id: input.farmId } }, // ✅ required relation
      inputDate: input.inputDate,
      dayIndex: input.dayIndex,
      feedName: input.feedName ?? null,
      feedData: input.feedData ?? null,
      deathWithLossQty: input.deathWithLossQty ?? 0,
      deathWithoutLoss: input.deathWithoutLoss ?? null,
      discard: input.discard ?? null,
      sale: input.sale ?? null,
      charcoal: input.charcoal ?? null,
      riceHusk: input.riceHusk ?? null,
      sugar: input.sugar ?? null,
      medicine: input.medicine ?? null,
      laborFee: input.laborFee ?? 0,
      balanceQty: nextQty,
      balanceWeight: nextWt,
      remark: input.remark ?? null,
    },
  });
}

export function update(id: string, data: Partial<Prisma.DailyInputUpdateInput>) {
  return prisma.dailyInput.update({
    where: { id },
    data,
  });
}

export function remove(id: string) {
  return prisma.dailyInput.delete({ where: { id } });
}
