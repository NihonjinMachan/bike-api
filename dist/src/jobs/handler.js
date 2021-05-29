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
exports.fetchData = void 0;
const lib_logger_1 = __importDefault(require("lib-logger"));
const config_1 = __importDefault(require("config"));
const api_1 = require("./api");
const db_1 = require("../db");
const indegoURL = config_1.default.get('indegoURL');
const weatherURL = config_1.default.get('weatherURL');
/**
* function that grabs the necessary keys from the raw API data
* and turns it into the required format
* @param {object[]} indegoData
* @param {object} weatherData
* @returns {object} formatted data
*/
const formatData = (indegoData, weatherData) => {
    let result = {};
    result['stations'] = indegoData.map(station => {
        const stationProperties = station.properties;
        return {
            kioskId: stationProperties.kioskId,
            name: stationProperties.name,
            addressStreet: stationProperties.addressStreet,
            addressCity: stationProperties.addressCity,
            latitude: stationProperties.latitude,
            longitude: stationProperties.longitude,
            totalDocks: stationProperties.totalDocks,
            docksAvailable: stationProperties.docksAvailable,
            bikesAvailable: stationProperties.bikesAvailable,
        };
    });
    result['weather'] = {
        name: weatherData.name,
        temp: weatherData.main.temp,
        description: weatherData.weather[0].description,
        tempMin: weatherData.main.temp_min,
        tempMax: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        visibility: weatherData.visibility
    };
    return result;
};
/*
function that handles the fetch data job
*/
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    lib_logger_1.default.info('Fetching Indego data..');
    const indegoData = yield api_1.fetch(indegoURL);
    lib_logger_1.default.info('Fetching Weather data..');
    const weatherData = yield api_1.fetch(weatherURL);
    const snapshotData = formatData(indegoData.features, weatherData);
    lib_logger_1.default.info('Saving data to database..');
    return db_1.saveData(snapshotData);
});
exports.fetchData = fetchData;
//# sourceMappingURL=handler.js.map