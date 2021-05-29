"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
//module that handles external API calls
const axios_1 = __importDefault(require("axios"));
const lib_logger_1 = __importDefault(require("lib-logger"));
/**
 * function that makes a GET request to a specified URL and returns the response object
 * @param {string} url
 * @returns {object} raw api data
*/
const fetch = (url) => {
    return axios_1.default.get(url)
        .then(response => {
        return response.data;
    })
        .catch(err => {
        if (err.response) {
            lib_logger_1.default.error('API call failed', { status: err.response.status, data: err.response.data });
        }
        throw err;
    });
};
exports.fetch = fetch;
//# sourceMappingURL=api.js.map