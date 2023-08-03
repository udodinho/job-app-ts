import { Request, Response } from "express"
import { loginHandler, registerUserHandler } from "../controller/auth-controller";
import { validateRequest } from "../middleware/auth-middleware";
import { createUserSchema, loginUserSchema } from "../schema/user-schema";
import express from "express";
const router = express.Router()

    router.get("/healthcheck", (req: Request, res: Response, next) => res.sendStatus(200));
    router.post("/register", validateRequest(createUserSchema), registerUserHandler);
    router.post("/login", validateRequest(loginUserSchema), loginHandler);

export default router;
