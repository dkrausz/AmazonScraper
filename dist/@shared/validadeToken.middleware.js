"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validadeToken = void 0;
const error_1 = require("./error");
const jsonwebtoken_1 = require("jsonwebtoken");
class ValidadeToken {
    constructor() {
        this.validadeToken = (req, res, next) => {
            const authorization = req.headers.authorization;
            const jwtKey = process.env.JWT_SECRET;
            console.log(authorization);
            if (!authorization) {
                throw new error_1.AppError(401, "Token is required.");
            }
            const [_prefix, token] = authorization.split(" ");
            const tokenDecoded = (0, jsonwebtoken_1.verify)(token, jwtKey);
            res.locals.token = tokenDecoded;
            return next();
        };
    }
}
exports.validadeToken = new ValidadeToken();
