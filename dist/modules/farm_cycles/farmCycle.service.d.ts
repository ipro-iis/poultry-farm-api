export declare function listByFarm(farmId: string, companyId: string): Promise<{
    id: string;
    farmId: string;
    cycleNumber: number;
    startDate: Date;
    endDate: Date | null;
    isActive: boolean;
}[]>;
export declare function listByCycle(cycleId: string, companyId: string): Promise<unknown>;
//# sourceMappingURL=farmCycle.service.d.ts.map