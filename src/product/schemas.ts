import {z} from "zod";

const productSchema = z.object({

    id:z.string().min(1),
    URL: z.string().min(1),
    name:z.string().min(1),
    photo:z.string().min(1),
    userId:z.string().min(1),

});

const returnSearchProduct = z.object({
    photo: z.string().min(1),
    name:z.string().min(1),
    price:z.number()
});

const findProductBodySchema =productSchema.pick({URL:true , name:true}).partial();

const createProductBodyScherma = productSchema.omit({id:true, userId:true});

const priceSchema = z.object({
    id:z.string().min(1),
    price:z.number(),
    productId:z.string().min(1),
    date:z.date()
});

const createPriceBodySchema = priceSchema.omit({id:true});
const returnRegisteredProduct=productSchema.extend({price:priceSchema.omit({id:true}).array()});

export{productSchema,priceSchema,returnSearchProduct,findProductBodySchema,createProductBodyScherma,returnRegisteredProduct, createPriceBodySchema};