import { Router } from "express";
import { bodyMiddleware } from "../@shared/body.middleware";
import { createClientbodySchema } from "./schemas";
import { clientController } from "./controller";

export const clientRouter = Router();

clientRouter.post("/", bodyMiddleware.bodyIsValid(createClientbodySchema) , clientController.create );