import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "./error";


class ExistId{

    public existId=async(req:Request,res:Response, next:NextFunction)=>{
    
        const {id} = req.params;              
        const product = await prisma.product.findFirst({where:{id}});        
        
        if(!product){
            throw new AppError(404, "Product not found");
        };

        res.locals.id=id;

        return next();
    };

};

export const existId = new ExistId();