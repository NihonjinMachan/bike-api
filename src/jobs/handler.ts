import logger from 'lib-logger';
import config from 'config';
import {regularObject} from '../types/regularObject';
import {fetch} from './api';
import {saveData} from '../db';

const indegoURL = config.get('indegoURL');
const weatherURL = config.get('weatherURL');

/**
* function that grabs the necessary keys from the raw API data 
* and turns it into the required format
* @param {object[]} indegoData
* @param {object} weatherData
* @returns {object} formatted data
*/
const formatData: (a: regularObject[], b: regularObject) => regularObject = (indegoData, weatherData) => {
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
        }
    });

    result['weather'] = {
        name: weatherData.name,
        temp: weatherData.main.temp,
        description: weatherData.weather[0].description,
        tempMin: weatherData.main.temp_min,
        tempMax: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        visibility: weatherData.visibility
    }
    return result;
}

/*
function that handles the fetch data job
*/
const fetchData = async(): Promise<any> => {
    logger.info('Fetching Indego data..');
    const indegoData: regularObject = await fetch(indegoURL);

    logger.info('Fetching Weather data..');
    const weatherData: regularObject = await fetch(weatherURL);

    const snapshotData: regularObject = formatData(indegoData.features, weatherData);
    
    logger.info('Saving data to database..');
    return saveData(snapshotData);
}

export { fetchData }