"use strict";
//a job that pulls data from Indego and Open Weather APIs and dumps it to the database
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
const lib_logger_1 = __importDefault(require("lib-logger"));
const handler_1 = require("./handler");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        lib_logger_1.default.info("Job Started: Fetch Data");
        yield handler_1.fetchData();
        lib_logger_1.default.info("Job Completed: Fetch Data");
        process.exit(0);
    }
    catch (err) {
        lib_logger_1.default.error("Job Failed: Fetch Data", err);
        process.exit(1);
    }
}))();
//# sourceMappingURL=fetchData.js.map