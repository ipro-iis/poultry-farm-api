export declare function register(data: {
    name: string;
    phoneNo: string;
    emailAddress: string;
    password: string;
}): Promise<{
    token: string;
    company: {
        password: undefined;
        id: string;
        phoneNo: string;
        name: string;
        emailAddress: string | null;
        createdAt: Date;
    };
}>;
export declare function login(phoneNo: string, password: string): Promise<{
    token: string;
    company: {
        password: undefined;
        id: string;
        phoneNo: string;
        name: string;
        emailAddress: string | null;
        createdAt: Date;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map