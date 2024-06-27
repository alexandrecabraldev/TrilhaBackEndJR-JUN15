import { Router } from "express";
import { LoginController } from "../controllers/loginController";
import { PrismaClient } from "@prisma/client";
export const loginRouter = Router()

const database = new PrismaClient()
const loginController = new LoginController(database);

loginRouter.route('/')
    .post(loginController.login)