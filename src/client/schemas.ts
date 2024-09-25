import {z} from "zod";

const clientSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(4) //colocar completo depois com regex etc
});

const createClientbodySchema = clientSchema.omit({id:true});
const returnCreateClientSchema = clientSchema.omit({password:true});

export{clientSchema,createClientbodySchema,returnCreateClientSchema};