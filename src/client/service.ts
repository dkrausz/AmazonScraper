import { AppError } from "../@shared/error";
import { prisma } from "../database/prisma";
import { TcreateBody } from "./interfaces"
import {createClientbodySchema, returnCreateClientSchema} from "./schemas"
import bcryptjs from "bcryptjs";
import {sign} from "jsonwebtoken";



class ClientService{

    public Create=async(payload:TcreateBody)=>{

       const hashPassword = await bcryptjs.hash(payload.password,10);   
       
       const newClientBody = {
        ...payload, 
        password:hashPassword,
       }

        const newClient = await prisma.user.create({data:newClientBody});      
        
        return returnCreateClientSchema.parse(newClient);

    };

    public login=async(email:string,password:string)=>{

        const jwtKey = process.env.JWT_SECRET as string;

        const foundClient = await prisma.user.findFirst({where:{email}});
        if(!foundClient){
            throw new AppError(403, "Email or Password does not match");

        };

        const compare = await bcryptjs.compare(password,foundClient.password);
        if(!compare){
            throw new AppError(403, "Email or Password does not match");

        };  

        const tokenGen: string = sign({}, jwtKey, {
            expiresIn: "24h",
            subject: foundClient.id,
          });

          return tokenGen;
    };


};


export const clientService = new ClientService();
