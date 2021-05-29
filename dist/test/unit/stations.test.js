"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const stations_1 = require("../../src/routes/stations");
const db = __importStar(require("../../src/db"));
const timeNotProvided_1 = require("../../src/errors/timeNotProvided");
const snapshotNotFound_1 = require("../../src/errors/snapshotNotFound");
describe('Stations test', () => {
    it('Should throw an error if no time is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(stations_1.findStations({})).rejects.toThrow(timeNotProvided_1.timeNotProvidedError);
    }));
    it('Should call the findStationByKioskId function if kioskId is passed', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(db, 'findStationByKioskId').mockResolvedValue([1]);
        jest.spyOn(db, 'findAllStations').mockResolvedValue([1]);
        yield stations_1.findStations({ at: '2021-05-29T06:56:28.712', kioskId: 3004 });
        expect(db.findStationByKioskId).toBeCalledTimes(1);
        expect(db.findAllStations).toBeCalledTimes(0);
    }));
    it('Should call the findAllStations function if kioskId is not passed', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(db, 'findStationByKioskId').mockResolvedValue([1]);
        jest.spyOn(db, 'findAllStations').mockResolvedValue([1]);
        yield stations_1.findStations({ at: '2021-05-29T06:56:28.712' });
        expect(db.findStationByKioskId).toBeCalledTimes(0);
        expect(db.findAllStations).toBeCalledTimes(1);
    }));
    it('Should throw an error if no result is found', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(db, 'findStationByKioskId').mockResolvedValue([]);
        jest.spyOn(db, 'findAllStations').mockResolvedValue([]);
        yield expect(stations_1.findStations({ at: '2021-05-29T06:56:28.712', kioskId: 3004 })).rejects.toThrow(snapshotNotFound_1.SnapshotNotFoundError);
    }));
});
//# sourceMappingURL=stations.test.js.map