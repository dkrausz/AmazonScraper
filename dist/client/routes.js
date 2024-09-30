"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express_1 = require("express");
const body_middleware_1 = require("../@shared/body.middleware");
const schemas_1 = require("./schemas");
const controller_1 = require("./controller");
exports.clientRouter = (0, express_1.Router)();
exports.clientRouter.post("/", body_middleware_1.bodyMiddleware.bodyIsValid(schemas_1.createClientbodySchema), controller_1.clientController.create);
exports.clientRouter.post("/login", body_middleware_1.bodyMiddleware.bodyIsValid(schemas_1.loginSchemaBody), controller_1.clientController.login);
//delete
//login
//read
//update
