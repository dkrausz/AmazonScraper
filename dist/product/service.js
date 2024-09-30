"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const prisma_1 = require("../database/prisma");
const schemas_1 = require("./schemas");
const error_1 = require("../@shared/error");
class ProductService {
    constructor() {
        this.findProduct = (URL) => __awaiter(this, void 0, void 0, function* () {
            const product = {};
            const response = yield (0, axios_1.default)(URL);
            const html = response.data;
            const $ = cheerio.load(html);
            const $itemName = $("#productTitle");
            const $divBox = $("div.a-section.a-spacing-micro");
            const $img = $("#imgTagWrapperId > img");
            let totalPrice = "";
            $divBox.each(function () {
                const price = $(this).find(".a-price-whole").text();
                const priceParcel = $(this).find(".a-price-fraction").text();
                if (price && priceParcel) {
                    totalPrice = `${price}${priceParcel}`;
                    return false;
                }
            });
            product.photo = $img.attr("src");
            totalPrice = totalPrice.replace(",", "");
            product.price = Math.round(Number(totalPrice) * 100);
            product.name = $itemName.text().trim();
            return schemas_1.returnSearchProduct.parse(product);
        });
        this.addProduct = (URL, userId, name) => __awaiter(this, void 0, void 0, function* () {
            const findedProduct = yield this.findProduct(URL);
            let productName;
            if (name) {
                productName = name;
            }
            else {
                productName = findedProduct.name;
            }
            const product = {
                name: productName,
                photo: findedProduct.photo,
                URL: URL,
                userId: userId,
            };
            const registeredProduct = yield prisma_1.prisma.product.create({ data: product });
            const date = new Date();
            const price = findedProduct.price;
            const registeredPrice = yield prisma_1.prisma.price.create({
                data: { date: date, price: price, productId: registeredProduct.id },
            });
            const newProduct = yield prisma_1.prisma.product.findFirst({
                where: { id: registeredProduct.id },
                include: { price: true },
            });
            return schemas_1.returnRegisteredProduct.parse(newProduct);
        });
        this.registerNewPrice = (id) => __awaiter(this, void 0, void 0, function* () {
            const retrivedProduct = yield prisma_1.prisma.product.findFirst({ where: { id } });
            if (!retrivedProduct) {
                throw new error_1.AppError(404, "product not found");
            }
            const updatedPrice = yield this.findProduct(retrivedProduct.URL);
            const date = new Date();
            const priceObject = {
                date: date,
                price: updatedPrice.price,
                productId: id,
            };
            const newPrice = yield prisma_1.prisma.price.create({ data: priceObject });
        });
        this.updatePrices = () => __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma_1.prisma.product.findMany({
                include: { price: true },
            });
            products.forEach((product) => __awaiter(this, void 0, void 0, function* () {
                yield this.registerNewPrice(product.id);
            }));
        });
        this.getAllProducts = (userId) => __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma_1.prisma.product.findMany({ where: { userId }, include: { price: true } });
            return schemas_1.returnRegisteredProduct.array().parse(products);
        });
        this.deleteProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.product.delete({ where: { id } });
        });
    }
}
;
exports.productService = new ProductService();
