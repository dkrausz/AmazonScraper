import express, { json } from "express";
import { productRoute } from "./product/routes";
import { clientRouter } from "./client/routes";
import { HandleErrors } from "./@shared/handleErrors";


export const app = express();

app.use(json());
app.use("/product",productRoute);
app.use("/client",clientRouter);
app.use(HandleErrors.execute);