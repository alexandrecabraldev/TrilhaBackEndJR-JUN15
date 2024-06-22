import {Request, Response} from "express"
import z from "zod"
import { InMemoryDatabaseCRUD } from "../database/inMemoryDatabase"

//schema de validação da entrada de dados usando a biblioteca zod
const createUserBodySchema = z.object({
    userName: z.string(),
    email: z.string().email("Este não é um email válido"),
    password_hash: z.string()
})

//typagem da validação da entrada de dados
type CreateUserBodySchemaType = z.infer<typeof createUserBodySchema>

export function createUserController(request: Request, response: Response){

    //validação de dados enviados pelo usuário no body da requisição
    const { userName, email, password_hash } = createUserBodySchema.parse(request.body)

    //instancia de um database em memoria, ainda não o database real, apenas um teste
    const database= new InMemoryDatabaseCRUD()

    //passando as informações para o database fake
    const userCreated = database.createUser({ 
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