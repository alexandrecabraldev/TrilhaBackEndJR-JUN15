import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { database } from "../database/prismaInstance";
import { authMiddleware } from "../middlewares/authMiddleware";

export const taskRoute = Router();

const taskController = new TaskController(database)

taskRoute.route('/create')
    .post(authMiddleware, taskController.create)

taskRoute.route('/read')
    .get(authMiddleware, taskController.read)

taskRoute.route('/update/:id')
    .put(authMiddleware, taskController.update)

taskRoute.route('/delete/:id')
    .delete(authMiddleware, taskController.delete)