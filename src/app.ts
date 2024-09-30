import express, { json } from "express";
import { productRoute } from "./product/routes";
import { clientRouter } from "./client/routes";
import { HandleErrors } from "./@shared/handleErrors";
import cron from "node-cron";
import { productService } from "./product/service";
import "express-async-errors";

export const app = express();

app.use(json());
app.use("/product",productRoute);
app.use("/client",clientRouter);
app.use(HandleErrors.execute);

const uptadatePrices=  cron.schedule('00 19 * * *', async () => {
    await productService.updatePrices();
    
  });

  const uptadatePrice2s=  cron.schedule('00 00 * * *', async () => {
    await productService.updatePrices();
    
  });

 

