import { Request, Response} from "express"
import { Prisma, PrismaClient } from "@prisma/client";
import z from "zod"
import jwt from "jsonwebtoken"
import { env } from "../dotenvConfig";
import { compare } from "bcrypt";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export class LoginController{

    constructor(private database:PrismaClient){
        this.login = this.login.bind(this)
    }

    async login(req:Request, res:Response){

        const { email, password } = loginSchema.parse(req.body);
       
        const user = await this.database.user.findFirst({
            where:{
                email,
            }
        })
   
        if (!user){
            return res.status(401).json({
                'message': 'invalid credentials'
            })
        }

        const isPasswordCorrect= await compare(password, user.password_hash)

        if(!isPasswordCorrect){
            return res.status(401).json({
                'message': 'invalid credentials'
            })
        }

        const token = jwt.sign({userId: user.userId}, env.SECRET_KEY, { expiresIn:'1h' })

        res.header('Authorization', `Bearer ${token}`);
        
        return res.json({
            'message': "user logged"
        })
        
    
    }
}
