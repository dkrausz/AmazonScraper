import { Router } from "express";
import { productController } from "./controller";
import { bodyMiddleware } from "../@shared/body.middleware";
import { findProductBodySchema } from "./schemas";



export const productRoute=Router();


productRoute.post("/",bodyMiddleware.bodyIsValid(findProductBodySchema), productController.findProduct);
productRoute.post("/add",bodyMiddleware.bodyIsValid(findProductBodySchema),productController.addProduct);