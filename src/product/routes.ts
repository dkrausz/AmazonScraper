import { Router } from "express";
import { productController } from "./controller";
import { bodyMiddleware } from "../@shared/body.middleware";
import { findProductBodySchema } from "./schemas";
import { existId } from "../@shared/existId.middleware";
import { validadeToken } from "../@shared/validadeToken.middleware";



export const productRoute=Router();


productRoute.post("/",bodyMiddleware.bodyIsValid(findProductBodySchema), productController.findProduct);
productRoute.post("/add",validadeToken.validadeToken,bodyMiddleware.bodyIsValid(findProductBodySchema),productController.addProduct);
productRoute.get("/",validadeToken.validadeToken ,productController.getProducts);
productRoute.delete("/:id",validadeToken.validadeToken,existId.existId, productController.deleteItem);