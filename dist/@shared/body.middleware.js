"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyMiddleware = void 0;
class BodyMiddleware {
    constructor() {
        this.bodyIsValid = (schema) => (req, _res, next) => {
            req.body = schema.parse(req.body);
            return next();
        };
    }
}
exports.bodyMiddleware = new BodyMiddleware();
