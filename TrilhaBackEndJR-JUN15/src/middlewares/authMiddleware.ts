import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { env } from "../dotenvConfig";

export function authMiddleware(req:Request, res:Response, next: NextFunction){

    const token = req.headers.authorization?.split(' ');
    
    if(!token){
        return res.status(401).json({
            "message": "not authenticated"
        })
    }

    try{
        const decoded = verify(token[1], env.SECRET_KEY) as JwtPayload
        req.userId = decoded.userId
        next();
        
    }catch(err){
        return res.json({
            'error': err
        })
    }
    
    
}