"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPriceBodySchema = exports.returnRegisteredProduct = exports.createProductBodyScherma = exports.findProductBodySchema = exports.returnSearchProduct = exports.priceSchema = exports.productSchema = void 0;
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    URL: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    photo: zod_1.z.string().min(1),
    userId: zod_1.z.string().min(1),
});
exports.productSchema = productSchema;
const returnSearchProduct = zod_1.z.object({
    photo: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    price: zod_1.z.number()
});
exports.returnSearchProduct = returnSearchProduct;
const findProductBodySchema = productSchema.pick({ URL: true, name: true }).partial();
exports.findProductBodySchema = findProductBodySchema;
const createProductBodyScherma = productSchema.omit({ id: true, userId: true });
exports.createProductBodyScherma = createProductBodyScherma;
const priceSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    price: zod_1.z.number(),
    productId: zod_1.z.string().min(1),
    date: zod_1.z.date()
});
exports.priceSchema = priceSchema;
const createPriceBodySchema = priceSchema.omit({ id: true });
exports.createPriceBodySchema = createPriceBodySchema;
const returnRegisteredProduct = productSchema.extend({ price: priceSchema.omit({ id: true }).array() });
exports.returnRegisteredProduct = returnRegisteredProduct;
