import { Request, Response } from "express";
import { clientService } from "./service";
import { TreturnBordy } from "./interfaces";


class ClientController{

    public create = async (req:Request,res:Response):Promise<Response<TreturnBordy>>=>{
        const newClient = await clientService.Create(req.body);
    
        
        return res.status(201).json(newClient);
    }

}

export const clientController = new ClientController();