import { Router } from "express"
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { PrismaClient } from "@prisma/client";

export const userRouter = Router();

const database = new PrismaClient() 
const userController = new UserController(database);

userRouter.route('/create')
    .post(userController.createUserController)

userRouter.route('/:id')
    .get(authMiddleware, userController.readUserController)

userRouter.route('/update/:id')
    .put(authMiddleware, userController.updateUserController)
