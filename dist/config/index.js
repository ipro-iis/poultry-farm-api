import dotenv from "dotenv";
dotenv.config();
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
}
export const config = {
    port: Number(process.env.PORT ?? 3000),
    jwtSecret: process.env.JWT_SECRET,
};
//# sourceMappingURL=index.js.map