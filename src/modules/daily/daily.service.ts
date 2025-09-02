import { prisma } from "../../prisma/client.js";
import type { Prisma } from "@prisma/client";

export function listByFarm(farmId: string) {
  return prisma.dailyInput.findMany({
    where: { farmId },
    orderBy: { dayIndex: "asc" },
  });
}

/**
 * Add a single daily input (for farms already in "using" status)
 */
export async function add(input: {
  farmId: string;
  inputDate: Date;
  dayIndex: number;
  chicken?: any;
  deathLoss?: any;
  deathSale?: any;
  discardSale?: any;
  goodSale?: any;
  chickenManure?: any;
  pesticides?: any;
  riceHusk?: any;
  charcoal?: any;
  sugar?: any;
  food?: any;
  medicine?: any;
  strengthMedicine?: any;
  vaccine?: any;
  laborFee?: any;
  other?: any;
  remark?: string | null;
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

  // const prevQty = last?.balanceQty ?? 0;
  // const prevWt = last?.balanceWeight ?? 0;
  // const lossQty = (input.deathWithLossQty ?? 0) + (input.deathWithoutLoss?.qty ?? 0) + (input.discard?.qty ?? 0) + (input.sale?.qty ?? 0);
  // const lossWt = (input.deathWithoutLoss?.weight ?? 0) + (input.discard?.weight ?? 0) + (input.sale?.weight ?? 0);
  // const nextQty = Math.max(0, prevQty - lossQty);
  // const nextWt = Math.max(0, prevWt - lossWt);
  // feedName: input.feedName ?? null,
  //     feedData: input.feedData ?? null,
  //     deathWithLossQty: input.deathWithLossQty ?? 0,
  //     deathWithoutLoss: input.deathWithoutLoss ?? null,
  //     discard: input.discard ?? null,
  //     sale: input.sale ?? null,
  //     charcoal: input.charcoal ?? null,
  //     riceHusk: input.riceHusk ?? null,
  //     sugar: input.sugar ?? null,
  //     medicine: input.medicine ?? null,
  //     laborFee: input.laborFee ?? 0,
  //     balanceQty: nextQty,
  //     balanceWeight: nextWt,

  return prisma.dailyInput.create({
    data: {
      farm: { connect: { id: input.farmId } }, // ✅ required relation
      inputDate: input.inputDate,
      dayIndex: input.dayIndex,
      chicken: input.chicken ?? null,
      deathLoss: input.deathLoss ?? null,
      deathSale: input.deathSale ?? null,
      discardSale: input.discardSale ?? null,
      goodSale: input.goodSale ?? null,
      chickenManure: input.chickenManure ?? null,
      pesticides: input.pesticides ?? null,
      riceHusk: input.riceHusk ?? null,
      charcoal: input.charcoal ?? null,
      sugar: input.sugar ?? null,
      food: input.food ?? null,
      medicine: input.medicine ?? null,
      strengthMedicine: input.strengthMedicine ?? null,
      vaccine: input.vaccine ?? null,
      laborFee: input.laborFee ?? null,
      other: input.other ?? null,
      remark: input.remark ?? null,
    },
  });
}

/**
 * Add Day 0 + Day 1 together for startup, and set farm status to "using"
 */
export async function addStartupWithDay1(input: {
  farmId: string;
  day0: Omit<Prisma.DailyInputCreateInput, "farm" | "id" | "createdAt">;
  day1: Omit<Prisma.DailyInputCreateInput, "farm" | "id" | "createdAt">;
}) {
  return prisma.$transaction(async (tx) => {
    const { farmId, day0, day1 } = input;

    const day0Data = { ...day0 } as any;
    delete day0Data.id;
    delete day0Data.farm;
    delete day0Data.farmId;

    const day1Data = { ...day1 } as any;
    delete day1Data.id;
    delete day1Data.farm;
    delete day1Data.farmId;

    const createdDay0 = await tx.dailyInput.create({
      data: {
        ...day0Data,
        farm: { connect: { id: farmId } },
      },
    });

    const createdDay1 = await tx.dailyInput.create({
      data: {
        ...day1Data,
        farm: { connect: { id: farmId } },
      },
    });

    await tx.farm.update({
      where: { id: farmId },
      data: { status: "using" },
    });

    return { day0: createdDay0, day1: createdDay1 };
  });
}
// export async function addStartupWithDay1(input: { farmId: string; day0: Omit<Prisma.DailyInputCreateInput, "farm">; day1: Omit<Prisma.DailyInputCreateInput, "farm"> }) {
//   return prisma.$transaction(async (tx) => {
//     // 1. Create Day 0
//     const day0 = await tx.dailyInput.create({
//       data: {
//         ...input.day0,
//         farm: { connect: { id: input.farmId } },
//       },
//     });

//     // do in the frontend
//     // // 2. Calculate Day 1 balance from Day 0
//     // const prevQty = day0.chicken?.qty ?? 0;
//     // const prevWeight = day0.chicken?.weight ?? 0;

//     // const lossQty = (input.day1.deathLoss as any)?.qty ?? 0 + ((input.day1.deathSale as any)?.qty ?? 0) + ((input.day1.discardSale as any)?.qty ?? 0) + ((input.day1.goodSale as any)?.qty ?? 0);

//     // const lossWeight =
//     //   (input.day1.deathLoss as any)?.weight ?? 0 + ((input.day1.deathSale as any)?.weight ?? 0) + ((input.day1.discardSale as any)?.weight ?? 0) + ((input.day1.goodSale as any)?.weight ?? 0);

//     // const balancedDay1 = {
//     //   ...input.day1,
//     //   chicken: {
//     //     ...(input.day1.chicken as any),
//     //     qty: Math.max(0, prevQty - lossQty),
//     //     weight: Math.max(0, prevWeight - lossWeight),
//     //   },
//     // };

//     // 3. Create Day 1
//     // const day1 = await tx.dailyInput.create({
//     //   data: {
//     //     ...balancedDay1,
//     //     farm: { connect: { id: input.farmId } },
//     //   },
//     // });
//     const day1 = await tx.dailyInput.create({
//       data: {
//         ...input.day1,
//         farm: { connect: { id: input.farmId } },
//       },
//     });

//     // 4. Update farm status
//     await tx.farm.update({
//       where: { id: input.farmId },
//       data: { status: "using" },
//     });

//     return { day0, day1 };
//   });
// }

export function update(id: string, data: Partial<Prisma.DailyInputUpdateInput>) {
  return prisma.dailyInput.update({
    where: { id },
    data,
  });
}

export async function updateAndRecalculate(id: string, data: Prisma.DailyInputUpdateInput) {
  return prisma.$transaction(async (tx) => {
    // 1. Update the target day
    const updatedDay = await tx.dailyInput.update({
      where: { id },
      data,
    });

    // 2. Get all days after this one for the same farm
    const subsequentDays = await tx.dailyInput.findMany({
      where: {
        farmId: updatedDay.farmId,
        dayIndex: { gt: updatedDay.dayIndex },
      },
      orderBy: { dayIndex: "asc" },
    });

    // 3. Start from updated day's balance
    let prevQty = (updatedDay.chicken as any)?.qty ?? 0;
    let prevWeight = (updatedDay.chicken as any)?.weight ?? 0;

    // 4. Loop through subsequent days and recalc
    for (const day of subsequentDays) {
      const lossQty = ((day.deathLoss as any)?.qty ?? 0) + ((day.deathSale as any)?.qty ?? 0) + ((day.discardSale as any)?.qty ?? 0) + ((day.goodSale as any)?.qty ?? 0);

      const lossWeight = ((day.deathLoss as any)?.weight ?? 0) + ((day.deathSale as any)?.weight ?? 0) + ((day.discardSale as any)?.weight ?? 0) + ((day.goodSale as any)?.weight ?? 0);

      const newQty = Math.max(0, prevQty - lossQty);
      const newWeight = Math.max(0, prevWeight - lossWeight);

      await tx.dailyInput.update({
        where: { id: day.id },
        data: {
          chicken: {
            ...(day.chicken as any),
            qty: newQty,
            weight: newWeight,
          },
        },
      });

      prevQty = newQty;
      prevWeight = newWeight;
    }

    return updatedDay;
  });
}

export function remove(id: string) {
  return prisma.dailyInput.delete({ where: { id } });
}
