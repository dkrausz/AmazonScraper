"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleErrors = void 0;
const error_1 = require("./error");
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
class HandleErrors {
    static execute(err, req, res, next) {
        if (err instanceof error_1.AppError) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({ errors: err.flatten().fieldErrors });
        }
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            res.status(401).json({ message: err.message });
        }
        return res.status(500).json({ error: "Internal server error." });
    }
}
exports.HandleErrors = HandleErrors;
