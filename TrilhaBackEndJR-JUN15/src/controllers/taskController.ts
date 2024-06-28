import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";


const createBodySchema = z.object({
    title: z.string(),
    description:z.string(),
    due_date: z.coerce.date()
})

const updateBodySchema = z.object({
    title: z.string().optional(),
    description:z.string().optional(),
    due_date: z.coerce.date().optional()
})

const idTaskSchema = z.string().uuid()

export class TaskController{

    constructor(private database:PrismaClient){
        this.create = this.create.bind(this)
        this.read = this.read.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async create(req: Request, res: Response){

        const {title, description, due_date} = createBodySchema.parse(req.body)

        if(!req.userId){
            return res.status(401).json({
                "message": "user not authenticated"
            })
        }

        const taskCreated = await this.database.task.create({
            data:{
                title,
                description,
                due_date,
                idUser: req.userId, 
            }
        })

        return res.status(201).json({
            "message":"task Created",
            "task": taskCreated
        })
    }

    async read(req: Request, res: Response){

        const tasksCurrentUser = await this.database.task.findMany({
            where:{
                idUser: req.userId
            }
        })

        return res.status(200).json({
            'tasks': tasksCurrentUser
        })
    }

    async update(req: Request, res: Response){

        const {title, description, due_date} = updateBodySchema.parse(req.body)

        const id = idTaskSchema.parse(req.params.id)

        const task = await this.database.task.update({
            where:{
                idTask: id
            },
            data:{
                title,
                description,
                due_date
            }
        })

        if(!task){
            return res.status(404).json({
                "message": "task not found"
            })
        }

        return res.status(200).json({
            "message": "task updated",
            "task": task
        })
    }

    async delete(req:Request, res:Response){
        
        const id = req.params.id

        const task = await this.database.task.delete({
            where:{
                idTask: id
            }
        })

        if(!task){
            return res.status(404).json({
                "message": "task not found"
            })
        }

        return res.status(200).json({
            "message": "task deleted",
            "task": task
        })
    }
}
