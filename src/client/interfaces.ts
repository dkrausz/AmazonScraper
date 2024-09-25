import {z} from "zod";
import { createClientbodySchema, returnCreateClientSchema } from "./schemas";

type TcreateBody = z.infer<typeof createClientbodySchema>;
type TreturnBordy = z.infer<typeof returnCreateClientSchema>;



export {TcreateBody,TreturnBordy}