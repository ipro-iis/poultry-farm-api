import { prisma } from "../../prisma/client.js";

export async function listByFarm(farmId: string, companyId: string) {
  // Verify farm belongs to the company
  const farm = await prisma.farm.findUnique({ where: { id: farmId } });
  if (!farm || farm.companyId !== companyId) {
    throw new Error("Not found");
  }

  return prisma.farmCycle.findMany({
    where: { farmId },
    orderBy: { cycleNumber: "desc" },
  });
}

export async function listByCycle(cycleId: string, companyId: string) {
  // 1️⃣ Verify cycle belongs to a farm in this company
  const cycle = await prisma.farmCycle.findUnique({
    where: { id: cycleId },
    include: { farm: true },
  });

  if (!cycle || cycle.farm.companyId !== companyId) {
    throw new Error("Not found");
  }

  // 2️⃣ Query with JSON field checks directly in Postgres
  return prisma.$queryRawUnsafe(
    `
    SELECT *
    FROM "DailyInput"
    WHERE "farmCycleId" = $1
      AND "dayIndex" <> 0
      AND (
        ("deathSale"->>'qty')::numeric > 0 OR
        ("deathSale"->>'weight')::numeric > 0 OR
        ("deathSale"->>'amount')::numeric > 0 OR

        ("discardSale"->>'qty')::numeric > 0 OR
        ("discardSale"->>'weight')::numeric > 0 OR
        ("discardSale"->>'amount')::numeric > 0 OR

        ("goodSale"->>'qty')::numeric > 0 OR
        ("goodSale"->>'weight')::numeric > 0 OR
        ("goodSale"->>'amount')::numeric > 0 OR

        ("chickenManure"->>'qty')::numeric > 0 OR
        ("chickenManure"->>'weight')::numeric > 0 OR
        ("chickenManure"->>'amount')::numeric > 0 OR

        ("pesticides"->>'qty')::numeric > 0 OR
        ("pesticides"->>'weight')::numeric > 0 OR
        ("pesticides"->>'amount')::numeric > 0 OR

        ("riceHusk"->>'qty')::numeric > 0 OR
        ("riceHusk"->>'weight')::numeric > 0 OR
        ("riceHusk"->>'amount')::numeric > 0 OR

        ("charcoal"->>'qty')::numeric > 0 OR
        ("charcoal"->>'weight')::numeric > 0 OR
        ("charcoal"->>'amount')::numeric > 0 OR

        ("sugar"->>'qty')::numeric > 0 OR
        ("sugar"->>'weight')::numeric > 0 OR
        ("sugar"->>'amount')::numeric > 0 OR

        ("food"->>'qty')::numeric > 0 OR
        ("food"->>'weight')::numeric > 0 OR
        ("food"->>'amount')::numeric > 0 OR

        ("medicine"->>'qty')::numeric > 0 OR
        ("medicine"->>'weight')::numeric > 0 OR
        ("medicine"->>'amount')::numeric > 0 OR

        ("strengthMedicine"->>'qty')::numeric > 0 OR
        ("strengthMedicine"->>'weight')::numeric > 0 OR
        ("strengthMedicine"->>'amount')::numeric > 0 OR

        ("vaccine"->>'qty')::numeric > 0 OR
        ("vaccine"->>'weight')::numeric > 0 OR
        ("vaccine"->>'amount')::numeric > 0 OR

        ("laborFee"->>'qty')::numeric > 0 OR
        ("laborFee"->>'weight')::numeric > 0 OR
        ("laborFee"->>'amount')::numeric > 0 OR

        ("other"->>'qty')::numeric > 0 OR
        ("other"->>'weight')::numeric > 0 OR
        ("other"->>'amount')::numeric > 0
      )
    ORDER BY "dayIndex" ASC
  `,
    cycleId
  );
  // ("chicken"->>'qty')::numeric > 0 OR
  // ("chicken"->>'weight')::numeric > 0 OR
  // ("chicken"->>'amount')::numeric > 0 OR
}
// export async function listByCycle(cycleId: string, companyId: string) {
//   // Verify cycle belongs to a farm in this company
//   const cycle = await prisma.farmCycle.findUnique({
//     where: { id: cycleId },
//     include: { farm: true },
//   });

//   if (!cycle || cycle.farm.companyId !== companyId) {
//     throw new Error("Not found");
//   }

//   return prisma.dailyInput.findMany({
//     where: { farmCycleId: cycleId },
//     orderBy: { dayIndex: "asc" },
//   });
// }
