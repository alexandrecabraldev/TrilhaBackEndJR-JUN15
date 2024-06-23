import {v4 as uuidv4} from "uuid"

interface DatabaseUserType{
    userId?:string,
    userName:string,
    email:string,
    password_hash:string,
}
//database fake, apenas um array em memória
export let databaseUser: DatabaseUserType[] =[]

export class InMemoryDatabaseCRUD {

    readUser(){
        return databaseUser;
    }

    deleteElement(id:string){
        const newDatabaseWithoutDeleted= databaseUser.filter((element)=>element.userId!==id)
        databaseUser = newDatabaseWithoutDeleted;
        
        return databaseUser;
    }

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