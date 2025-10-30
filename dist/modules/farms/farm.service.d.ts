import type { FarmStatus } from "@prisma/client";
export declare function list(companyId: string): import("@prisma/client").Prisma.PrismaPromise<{
    id: string;
    createdAt: Date;
    farmNo: string;
    remark: string | null;
    status: import("@prisma/client").$Enums.FarmStatus;
    isInactive: boolean;
    companyId: string;
}[]>;
export declare function create(companyId: string, farmNo: string, remark: string): import("@prisma/client").Prisma.Prisma__FarmClient<{
    id: string;
    createdAt: Date;
    farmNo: string;
    remark: string | null;
    status: import("@prisma/client").$Enums.FarmStatus;
    isInactive: boolean;
    companyId: string;
}, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
export declare function update(id: string, data: {
    farmNo?: string;
    remark?: string;
    status?: FarmStatus;
}): import("@prisma/client").Prisma.Prisma__FarmClient<{
    id: string;
    createdAt: Date;
    farmNo: string;
    remark: string | null;
    status: import("@prisma/client").$Enums.FarmStatus;
    isInactive: boolean;
    companyId: string;
}, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
export declare function remove(id: string, companyId: string): Promise<void>;
export declare function closeFarm(id: string, companyId: string): Promise<{
    id: string;
    createdAt: Date;
    farmNo: string;
    remark: string | null;
    status: import("@prisma/client").$Enums.FarmStatus;
    isInactive: boolean;
    companyId: string;
}>;
export declare function removeFarm(id: string, companyId: string): Promise<{
    id: string;
    createdAt: Date;
    farmNo: string;
    remark: string | null;
    status: import("@prisma/client").$Enums.FarmStatus;
    isInactive: boolean;
    companyId: string;
}>;
//# sourceMappingURL=farm.service.d.ts.map