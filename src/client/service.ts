import { prisma } from "../database/prisma";
import { TcreateBody } from "./interfaces"
import {createClientbodySchema, returnCreateClientSchema} from "./schemas"


class ClientService{

    public Create=async(payload:TcreateBody)=>{

        const newClient = await prisma.user.create({data:payload});      
        
        return returnCreateClientSchema.parse(newClient);

    };


}


export const clientService = new ClientService();
