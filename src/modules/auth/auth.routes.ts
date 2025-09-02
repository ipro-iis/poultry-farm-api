import { Router } from "express";
import { z } from "zod";
import { validate } from "../../middleware/validate.js";
import { login, register } from "./auth.controller.js";

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    phoneNo: z.string().min(3),
    emailAddress: z.string().email(),
    password: z.string().min(6),
  }),
});

const loginSchema = z.object({
  body: z.object({
    phoneNo: z.string().min(3),
    password: z.string().min(6),
  }),
});

const router = Router();
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
