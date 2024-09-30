"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchemaBody = exports.returnCreateClientSchema = exports.createClientbodySchema = exports.clientSchema = void 0;
const zod_1 = require("zod");
const clientSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4) //colocar completo depois com regex etc
});
exports.clientSchema = clientSchema;
const createClientbodySchema = clientSchema.omit({ id: true });
exports.createClientbodySchema = createClientbodySchema;
const returnCreateClientSchema = clientSchema.omit({ password: true });
exports.returnCreateClientSchema = returnCreateClientSchema;
const loginSchemaBody = clientSchema.pick({ email: true, password: true });
exports.loginSchemaBody = loginSchemaBody;
