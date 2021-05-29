"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const lib_logger_1 = __importDefault(require("lib-logger"));
//simple error handler that returns a json error
let errorHandler = (app) => {
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        lib_logger_1.default.error(err.message);
        res.status(statusCode).send({
            statusCode: statusCode,
            message: err.message ? err.message : "Internal Server Error",
        });
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=utils.js.map