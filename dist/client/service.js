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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientService = void 0;
const error_1 = require("../@shared/error");
const prisma_1 = require("../database/prisma");
const schemas_1 = require("./schemas");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
class ClientService {
    constructor() {
        this.Create = (payload) => __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcryptjs_1.default.hash(payload.password, 10);
            const newClientBody = Object.assign(Object.assign({}, payload), { password: hashPassword });
            const newClient = yield prisma_1.prisma.user.create({ data: newClientBody });
            return schemas_1.returnCreateClientSchema.parse(newClient);
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const jwtKey = process.env.JWT_SECRET;
            const foundClient = yield prisma_1.prisma.user.findFirst({ where: { email } });
            if (!foundClient) {
                throw new error_1.AppError(403, "Email or Password does not match");
            }
            ;
            const compare = yield bcryptjs_1.default.compare(password, foundClient.password);
            if (!compare) {
                throw new error_1.AppError(403, "Email or Password does not match");
            }
            ;
            const tokenGen = (0, jsonwebtoken_1.sign)({}, jwtKey, {
                expiresIn: "24h",
                subject: foundClient.id,
            });
            return tokenGen;
        });
    }
}
;
exports.clientService = new ClientService();
