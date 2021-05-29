"use strict";
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
const index_1 = require("../../src/index");
const lodash_1 = __importDefault(require("lodash"));
const supertest_1 = __importDefault(require("supertest"));
describe("Stations endpoint integration test", () => {
    it("All stations request", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(index_1.app).get("/api/v1/stations?at=2021-05-29T06:56:28.712");
        const testKiosk = lodash_1.default.find(result.body.stations, { kioskId: 3004 }); //grab a sample station object to make sure the data is accurate
        const testWeather = result.body.weather.name;
        expect(result.body.stations.length).toBe(149); //there are 149 kiosks in Philadelphia
        expect(testKiosk.name).toBe("Municipal Services Building Plaza");
        expect(testWeather).toBe("Philadelphia"); //make sure weather info is for Philadelphia
        expect(result.statusCode).toEqual(200);
    }));
    it("Specific station request", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest_1.default(index_1.app).get("/api/v1/stations?kioskId=3004&at=2021-05-29T06:56:28.712");
        expect(result.body.stations.length).toBe(1); //make sure only snapshot for only one kiosk is received
        expect(result.body.stations[0].kioskId).toBe(3004); //make sure we got the snapshot for the kiosk that was requested for
        expect(result.statusCode).toEqual(200);
    }));
});
//# sourceMappingURL=index.test.js.map