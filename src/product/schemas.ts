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
}).partial();

const findProductBodySchema =productSchema.pick({URL:true});

const createProductBodyScherma = productSchema.omit({id:true, userId:true});

const priceSchema = z.object({
    id:z.string().min(1),
    price:z.number(),
    productId:z.string().min(1),
    date:z.date()
})
const returnRegisteredProduct=productSchema.extend({price:priceSchema.omit({id:true}).array()});

export{productSchema,priceSchema,returnSearchProduct,findProductBodySchema,createProductBodyScherma,returnRegisteredProduct};