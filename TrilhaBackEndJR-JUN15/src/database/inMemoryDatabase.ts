import {v4 as uuidv4} from "uuid"

interface DatabaseUserType{
    userId?:string,
    userName:string,
    email:string,
    password_hash:string,
}
//database fake, apenas um array em memória
const databaseUser: DatabaseUserType[] =[]

export class InMemoryDatabaseCRUD {

    //criação de usuário em um array em memória
    createUser( data: DatabaseUserType ){

        const { userName, email, password_hash } = data;
    
        databaseUser.push({
            userId: uuidv4(), 
            userName,
            email,
            password_hash
        })
    
        const userAdded = databaseUser.find((element)=>element.email===email)
    
        return userAdded;
    }
}