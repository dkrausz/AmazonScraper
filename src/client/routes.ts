import { Router } from "express";
import { bodyMiddleware } from "../@shared/body.middleware";
import { createClientbodySchema, loginSchemaBody } from "./schemas";
import { clientController } from "./controller";

export const clientRouter = Router();

clientRouter.post("/", bodyMiddleware.bodyIsValid(createClientbodySchema) , clientController.create );
clientRouter.post("/login",bodyMiddleware.bodyIsValid(loginSchemaBody),clientController.login);
//delete
//login
//read
//update