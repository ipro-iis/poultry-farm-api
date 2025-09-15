import bcrypt from "bcryptjs";
import { prisma } from "../../prisma/client.js";
import { signJwt } from "../../utils/jwt.js";

export async function register(data: { name: string; phoneNo: string; emailAddress: string; password: string }) {
  const existing = await prisma.company.findFirst({
    where: { phoneNo: data.phoneNo }, //{ OR: [{ phoneNo: data.phoneNo }, { emailAddress: data.emailAddress }] },
  });
  if (existing) throw new Error("Account already exists");

  const hashed = await bcrypt.hash(data.password, 10);
  const company = await prisma.company.create({
    data: { ...data, password: hashed },
  });
  const token = signJwt({ sub: company.id });
  return { token, company: { ...company, password: undefined } };
}

export async function login(phoneNo: string, password: string) {
  const company = await prisma.company.findUnique({ where: { phoneNo } });
  if (!company) throw new Error("Invalid credentials");
  const match = await bcrypt.compare(password, company.password);
  if (!match) throw new Error("Invalid credentials");
  const token = signJwt({ sub: company.id });
  return { token, company: { ...company, password: undefined } };
}
