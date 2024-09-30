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
exports.productController = void 0;
const service_1 = require("./service");
class ProductController {
    constructor() {
        this.findProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = yield service_1.productService.findProduct(req.body.URL);
            return res.status(200).json(product);
        });
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = res.locals.token.sub;
            const product = yield service_1.productService.addProduct(req.body.URL, userId, req.body.name);
            return res.status(201).json(product);
        });
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = res.locals.token.sub;
            console.log(userId);
            const products = yield service_1.productService.getAllProducts(userId);
            return res.status(200).json(products);
        });
        this.deleteItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield service_1.productService.deleteProduct(res.locals.id);
            return res.status(204).json("");
        });
    }
}
exports.productController = new ProductController();
