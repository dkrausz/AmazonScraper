import { Request, Response } from "express";
import { productService } from "./service";

class ProductController{


    public create=async(req:Request ,res:Response)=>{
        console.log("to aqui");
        
        //  console.log(req);
        console.log(req.body);
    const product = await productService.create(req.body.URL);
    

        return res.status(200).json(product)
    }

}

export const productController = new ProductController();