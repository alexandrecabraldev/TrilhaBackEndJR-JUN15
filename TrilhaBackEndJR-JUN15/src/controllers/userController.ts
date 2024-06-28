import {Request, Response} from "express"
import z from "zod"
import { hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"

//schema de validação da entrada de dados usando a biblioteca zod
const createUserBodySchema = z.object({
    userName: z.string(),
    email: z.string().email("Este não é um email válido"),
    password: z.string()
})

const idUserIdSchema = z.string().uuid()

//typagem da validação da entrada de dados
type CreateUserBodySchemaType = z.infer<typeof createUserBodySchema>

const updateBodySchema = z.object({
    userName: z.string().optional(),
    password: z.string().optional()
})

//instancia de um database em memoria, ainda não o database real, apenas um teste
// const database = new PrismaClient()
export const salt = 4;

export class UserController{

    constructor(private database:PrismaClient){
        this.createUserController = this.createUserController.bind(this)
        this.readUserController = this.readUserController.bind(this)
        this.updateUserController = this.updateUserController.bind(this)
    }

    async createUserController(request: Request, response: Response){
        
        //validação de dados enviados pelo usuário no body da requisição
        const { userName, email, password } = createUserBodySchema.parse(request.body)
    
        //encriptando a senha
        const password_hash = await hash(password, salt)
        
        //passando as informações para o database
        const userCreated = await this.database.user.create({ 
            data:{
                userName, 
                email, 
                password_hash 
            }
        })
    
        //retorno de sucesso
        return response.json({
            "message": "user created susessfully",
            "user": userCreated.userName
        })
    }   

    //retorna as informações do usuário pelo id
    async readUserController(req:Request, res:Response){

        //capturando e validando o id da requisição
        const id = idUserIdSchema.parse(req.params.id)

        //buscando o usuário pelo id no banco 
        const user = await this.database.user.findFirst({
            where:{
                userId:id
            }
        })

        // se o usuário não for encontrado 
        if (! user){
            return res.json({
                "message": "user not found"
            })
        }

        // caso usuário seja encontrado
        return res.json({
            "user":{
                "userId": user.userId,
                "userName": user.userName,
                "email":user.email,
            }
        })
    }

    async updateUserController(req: Request, res: Response){
        //validação do body da requisição, só é possivel atualizar o nome e a senha, email e id não é possível
        const updatedData = updateBodySchema.parse(req.body)
        //capturando o id do usuário a ser atualizado
        const id = idUserIdSchema.parse(req.params.id)

        let password_hash:string | undefined;
        // fazendo o hash da senha
        if(updatedData.password){
            password_hash = await hash(updatedData.password, salt)
        }
        //atualizando o usuário no banco
        const user = await this.database.user.update({
            where:{
                userId:id,
            },
            
            data:{
                userName: updatedData.userName,
                password_hash,
            }
        })
        //retornando o usuário atualizado
        return res.status(201).json({
            "userUpdated": {
                "userName": user.userName,
                "password_hash": user.password_hash
            }
        })
    }
}
