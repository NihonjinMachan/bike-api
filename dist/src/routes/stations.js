"use strict";
//module that handles API calls to the stations endpoint
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
exports.findStations = void 0;
const lib_logger_1 = __importDefault(require("lib-logger"));
const timeNotProvided_1 = require("../errors/timeNotProvided");
const snapshotNotFound_1 = require("../errors/snapshotNotFound");
const db_1 = require("../db");
/**
 * Function that returns station snapshot for all stations at a specified time
 * or specific station by kioskId at a specific time
 * @param {object }requestData (query string params)
 * @returns {Promise}
 */
const findStations = (requestData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!requestData.at) {
        throw new timeNotProvided_1.timeNotProvidedError('Time is not specified!');
    }
    let result;
    if (requestData.kioskId) {
        let kioskId = parseInt(requestData.kioskId);
        [result] = yield db_1.findStationByKioskId(requestData.at, kioskId);
    }
    else {
        [result] = yield db_1.findAllStations(requestData.at);
    }
    if (!result) {
        throw new snapshotNotFound_1.SnapshotNotFoundError('Requested snapshot not available in the database');
    }
    lib_logger_1.default.info('Successfully retrieved station data from the database', { result });
    return result;
});
exports.findStations = findStations;
//# sourceMappingURL=stations.js.map