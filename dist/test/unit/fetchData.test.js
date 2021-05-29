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
const handler_1 = require("../../src/jobs/handler");
const api = __importStar(require("../../src/jobs/api"));
const db = __importStar(require("../../src/db"));
describe("Fetch data tests", () => {
    it('should compile data in the correct format', () => __awaiter(void 0, void 0, void 0, function* () {
        //mock indego API data
        const indegoData = {
            "features": [{
                    "geometry": {
                        "coordinates": [-75.16374, 39.95378],
                        "type": "Point"
                    },
                    "properties": {
                        "id": 3004,
                        "name": "Municipal Services Building Plaza",
                        "coordinates": [-75.16374, 39.95378],
                        "totalDocks": 30,
                        "docksAvailable": 14,
                        "bikesAvailable": 14,
                        "classicBikesAvailable": 14,
                        "smartBikesAvailable": 0,
                        "electricBikesAvailable": 0,
                        "addressStreet": "1401 John F. Kennedy Blvd.",
                        "addressCity": "Philadelphia",
                        "kioskId": 3004,
                        "trikesAvailable": 0,
                        "latitude": 39.95378,
                        "longitude": -75.16374
                    },
                    "type": "Feature"
                }]
        };
        //mock weather API data
        const weatherData = {
            "coord": { "lon": -75.1638, "lat": 39.9523 },
            "weather": [{ "id": 502, "main": "Rain", "description": "heavy intensity rain", "icon": "10d" }],
            "base": "stations",
            "main": {
                "temp": 8.87,
                "feels_like": 6.6,
                "temp_min": 7.88,
                "temp_max": 9.95,
                "pressure": 1011,
                "humidity": 93
            },
            "visibility": 9656,
            "name": "Philadelphia"
        };
        jest.spyOn(api, 'fetch').mockReturnValueOnce(indegoData);
        jest.spyOn(api, 'fetch').mockReturnValueOnce(weatherData);
        jest.spyOn(db, 'saveData').mockResolvedValue(1);
        const expectedPayload = {
            stations: [{
                    kioskId: 3004,
                    name: "Municipal Services Building Plaza",
                    addressStreet: "1401 John F. Kennedy Blvd.",
                    addressCity: "Philadelphia",
                    latitude: 39.95378,
                    longitude: -75.16374,
                    totalDocks: 30,
                    docksAvailable: 14,
                    bikesAvailable: 14,
                }],
            weather: {
                name: "Philadelphia",
                temp: 8.87,
                description: "heavy intensity rain",
                tempMin: 7.88,
                tempMax: 9.95,
                humidity: 93,
                visibility: 9656
            }
        };
        yield handler_1.fetchData();
        expect(db.saveData).toBeCalledTimes(1);
        expect(db.saveData).toBeCalledWith(expect.objectContaining(expectedPayload));
    }));
});
//# sourceMappingURL=fetchData.test.js.map