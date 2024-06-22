import { Router } from "express"
import { createUserController } from "../controllers/createTaskController";

export const userRouter = Router();

userRouter.route('/create').post(createUserController)