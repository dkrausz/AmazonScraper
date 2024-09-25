import {z} from "zod";
import { createProductBodyScherma, productSchema, returnRegisteredProduct, returnSearchProduct } from "./schemas";

type TProduct = z.infer<typeof productSchema>;

type TFindproduct = z.infer<typeof returnSearchProduct>;

type TCreateProduct= z.infer<typeof createProductBodyScherma>;

type TreturnBody = z.infer<typeof returnRegisteredProduct>;

export { TProduct, TFindproduct, TCreateProduct,TreturnBody };
