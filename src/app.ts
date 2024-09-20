import express, { json } from "express";
import { productRoute } from "./product/routes";


export const app = express();

app.use(json());
app.use("/product",productRoute);