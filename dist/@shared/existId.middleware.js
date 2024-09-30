"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existId = void 0;
const prisma_1 = require("../database/prisma");
const error_1 = require("./error");
class ExistId {
    constructor() {
        this.existId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield prisma_1.prisma.product.findFirst({ where: { id } });
            if (!product) {
                throw new error_1.AppError(404, "Product not found");
            }
            ;
            res.locals.id = id;
            return next();
        });
    }
}
;
exports.existId = new ExistId();
