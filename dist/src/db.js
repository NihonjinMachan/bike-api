"use strict";
//this module handles db connection as well as all db interactions
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
exports.findStationByKioskId = exports.findAllStations = exports.saveData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const lib_logger_1 = __importDefault(require("lib-logger"));
const moment_1 = __importDefault(require("moment"));
const snapshot_1 = require("./models/snapshot");
const db = config_1.default.get('mongoURI');
//establish mongodb connection
mongoose_1.default.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => lib_logger_1.default.info("DB connection successful"))
    .catch((err) => lib_logger_1.default.error("DB connection failed", { err }));
/**
 * Function that takes formatted API data, turns into an object of interface Snapshot and saves to the db
 * @param {object} data
 * @returns {Promise}
 */
const saveData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const dataToAdd = {
        at: undefined,
        stations: data.stations,
        weather: data.weather,
    };
    const newRecord = new snapshot_1.snapshotModel(dataToAdd);
    return newRecord.save();
});
exports.saveData = saveData;
/**
 * Function that returns snapshot data for all kiosks at a given time
 * @param {string} at
 * @returns {Promise}
 */
const findAllStations = (at) => __awaiter(void 0, void 0, void 0, function* () {
    let dbTime = moment_1.default(at).utcOffset(0, true).toDate(); //assumes that the provided timezone in the request is already in UTC thereby preventing further conversions
    return snapshot_1.snapshotModel.find({ at: { $gte: dbTime } }, { at: 1, stations: 1, weather: 1, _id: 0 }).limit(1);
});
exports.findAllStations = findAllStations;
/**
 * Function that returns snapshot data for a specific kiosk at a given time
 * @param {string} at
 * @returns {Promise}
 */
const findStationByKioskId = (at, kioskId) => __awaiter(void 0, void 0, void 0, function* () {
    let dbTime = moment_1.default(at).utcOffset(0, true).toDate();
    return snapshot_1.snapshotModel.find({ $and: [
            { at: { $gte: dbTime } },
            { "stations.kioskId": kioskId }
        ] }, {
        at: 1,
        stations: { $elemMatch: { kioskId: kioskId } },
        weather: 1,
        _id: 0,
    }).limit(1);
});
exports.findStationByKioskId = findStationByKioskId;
//# sourceMappingURL=db.js.map