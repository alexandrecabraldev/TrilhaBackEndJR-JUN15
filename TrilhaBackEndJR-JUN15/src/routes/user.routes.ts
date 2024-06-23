import { Router } from "express"
import { UserController } from "../controllers/userController";

export const userRouter = Router();

const userController = new UserController();

userRouter.route('/')
    .get(userController.readUserController)

userRouter.route('/create')
    .post(userController.createUserController)

userRouter.route('/update/:id')
    .put(userController.updateUserController)

userRouter.route('/delete/:id')
    .delete(userController.deleteUserController)