import {z} from "zod";
import { createPriceBodySchema, createProductBodyScherma, productSchema, returnRegisteredProduct, returnSearchProduct } from "./schemas";

type TProduct = z.infer<typeof productSchema>;

type TFindproduct = Partial<z.infer<typeof returnSearchProduct>>;

type TCreateProduct= z.infer<typeof createProductBodyScherma>;

type TreturnBody = z.infer<typeof returnRegisteredProduct>;

type TCreatePriceBody = z.infer<typeof createPriceBodySchema>;

export { TProduct, TFindproduct, TCreateProduct,TreturnBody,TCreatePriceBody };
