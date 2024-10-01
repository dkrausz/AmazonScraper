import { Request, Response } from "express";
import { productService } from "./service";
import { TreturnBody } from "./interfaces";

class ProductController{


    public findProduct=async(req:Request ,res:Response)=>{              
    const product = await productService.findProduct(req.body.URL);       
    
        return res.status(200).json(product)
    };

    public addProduct = async (req:Request, res:Response):Promise<Response<TreturnBody>>=>{
       
        const userId = res.locals.token.sub;
        const product = await productService.addProduct(req.body.URL,userId,req.body.name);
        return res.status(201).json(product)
    };

    public getProducts = async(req:Request, res:Response) =>{

        const userId = res.locals.token.sub;
                
        const products = await productService.getAllProducts(userId);

        return res.status(200).json(products);
    }

    public deleteItem = async(req:Request, res:Response)=>{
        await productService.deleteProduct(res.locals.id);

        return res.status(204).json("");
    }

}

export const productController = new ProductController();