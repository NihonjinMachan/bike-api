import {fetchData} from '../../src/jobs/handler';
import * as api from '../../src/jobs/api';
import * as db from '../../src/db';
import {regularObject} from '../../src/types/regularObject';
import mongoose from 'mongoose';

describe("Fetch data tests", () => {
    it('should compile data in the correct format', async () => {
        //mock indego API data
        const indegoData : regularObject = {
            "features": [{
                "geometry": {
                    "coordinates":[-75.16374,39.95378],
                    "type":"Point"
                },
                "properties":{
                    "id":3004,
                    "name":"Municipal Services Building Plaza",
                    "coordinates":[-75.16374,39.95378],
                    "totalDocks":30,
                    "docksAvailable":14,
                    "bikesAvailable":14,
                    "classicBikesAvailable":14,
                    "smartBikesAvailable":0,
                    "electricBikesAvailable":0,
                    "addressStreet":"1401 John F. Kennedy Blvd.",
                    "addressCity":"Philadelphia",
                    "kioskId":3004,
                    "trikesAvailable":0,
                    "latitude":39.95378,
                    "longitude":-75.16374
                },
                "type":"Feature"
            }]
        };

        //mock weather API data
        const weatherData: regularObject = {
            "coord": {"lon":-75.1638,"lat":39.9523},
            "weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],
            "base":"stations",
            "main":{
                "temp":8.87,
                "feels_like":6.6,
                "temp_min":7.88,
                "temp_max":9.95,
                "pressure":1011,
                "humidity":93
            },
            "visibility":9656
            ,"name":"Philadelphia"
        }
        
        jest.spyOn(api, 'fetch').mockReturnValueOnce(indegoData);
        jest.spyOn(api, 'fetch').mockReturnValueOnce(weatherData);
        jest.spyOn(db, 'saveData').mockResolvedValue(1);

        const expectedPayload: regularObject = {
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

        await fetchData();
        expect(db.saveData).toBeCalledTimes(1);
        expect(db.saveData).toBeCalledWith(expect.objectContaining(expectedPayload));
    });
});