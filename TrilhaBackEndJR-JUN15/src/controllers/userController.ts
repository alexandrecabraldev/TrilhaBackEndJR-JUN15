import {Request, Response} from "express"
import z from "zod"
import { InMemoryDatabaseCRUD } from "../database/inMemoryDatabase"
import { databaseUser } from "../database/inMemoryDatabase"

//schema de validação da entrada de dados usando a biblioteca zod
const createUserBodySchema = z.object({
    userName: z.string(),
    email: z.string().email("Este não é um email válido"),
    password_hash: z.string()
})

const deleteUserIdSchema = z.string().uuid()

//typagem da validação da entrada de dados
type CreateUserBodySchemaType = z.infer<typeof createUserBodySchema>

const databaseCRUD = new InMemoryDatabaseCRUD()

export class UserController{

    createUserController(request: Request, response: Response){
        
        //validação de dados enviados pelo usuário no body da requisição
        const { userName, email, password_hash } = createUserBodySchema.parse(request.body)
    
        //instancia de um database em memoria, ainda não o database real, apenas um teste
        
    
        //passando as informações para o database fake
        const userCreated = databaseCRUD.createUser({ 
            userName, 
            email, 
            password_hash 
        })
    
        //retorno de sucesso
        return response.json({
            "message": "user created susessfully",
            "user": userCreated?.userName
        })
    }   

    //retorna todos os usuários do banco
    readUserController(_req:Request, res:Response){
        return res.json({
            "users": databaseUser
        })
    }

    updateUserController(){

    }

    //deleta um usuário pelo id
    deleteUserController(req:Request, res:Response){

        const id  = deleteUserIdSchema.parse(req.params.id)

        const database = databaseCRUD.deleteElement(id)

        return res.json({
            "users": database
        })
    }
}
