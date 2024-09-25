import { Request, Response } from "express";
import { productService } from "./service";
import { TreturnBody } from "./interfaces";

class ProductController{


    public findProduct=async(req:Request ,res:Response)=>{              
    const product = await productService.findProduct(req.body.URL);       
    
        return res.status(200).json(product)
    }

    public addProduct = async (req:Request, res:Response):Promise<Response<TreturnBody>>=>{
        const product = await productService.addProduct(req.body.URL,"2111c31e-ce90-43e4-983e-d040557198bd",req.body.name);
        return res.status(201).json(product)
    }

}

export const productController = new ProductController();