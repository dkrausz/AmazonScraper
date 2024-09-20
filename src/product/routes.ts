import { Router } from "express";
import { productController } from "./controller";



export const productRoute=Router();


productRoute.post("/",productController.create);