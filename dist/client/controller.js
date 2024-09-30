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
exports.clientController = void 0;
const service_1 = require("./service");
class ClientController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newClient = yield service_1.clientService.Create(req.body);
            return res.status(201).json(newClient);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const loggedIn = yield service_1.clientService.login(req.body.email, req.body.password);
            return res.status(200).json(loggedIn);
        });
    }
}
;
exports.clientController = new ClientController();
