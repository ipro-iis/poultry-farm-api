import { z } from "zod";
export const dailyBodySchema = z.object({
    id: z.string().optional().nullable(),
    farmId: z.string().optional(),
    inputDate: z.string(),
    dayIndex: z.number().int().min(0),
    chicken: z.any().optional().nullable(),
    deathLoss: z.any().optional().nullable(),
    deathSale: z.any().optional().nullable(),
    discardSale: z.any().optional().nullable(),
    goodSale: z.any().optional().nullable(),
    chickenManure: z.any().optional().nullable(),
    pesticides: z.any().optional().nullable(),
    riceHusk: z.any().optional().nullable(),
    charcoal: z.any().optional().nullable(),
    sugar: z.any().optional().nullable(),
    food: z.any().optional().nullable(),
    medicine: z.any().optional().nullable(),
    strengthMedicine: z.any().optional().nullable(),
    vaccine: z.any().optional().nullable(),
    laborFee: z.any().optional().nullable(),
    other: z.any().optional().nullable(),
    remark: z.string().optional().nullable().or(z.literal("")),
});
export const addSchema = z.object({
    params: z.object({ farmId: z.string().uuid() }),
    body: dailyBodySchema,
});
export const startupSchema = z.object({
    params: z.object({ farmId: z.string().uuid() }),
    body: z.object({
        day0: dailyBodySchema,
        day1: dailyBodySchema,
    }),
});
//# sourceMappingURL=daily.schemas.js.map