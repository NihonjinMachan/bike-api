import {app} from '../../src/index';
import lodash from 'lodash';
import request from 'supertest';

describe("Stations endpoint integration test", () => {
    it("All stations request", async () => {
      const result = await request(app).get("/api/v1/stations?at=2021-05-29T06:56:28.712");
      const testKiosk = lodash.find(result.body.stations, {kioskId: 3004}); //grab a sample station object to make sure the data is accurate
      const testWeather = result.body.weather.name; 

      expect(result.body.stations.length).toBe(149); //there are 149 kiosks in Philadelphia
      expect(testKiosk.name).toBe("Municipal Services Building Plaza");
      expect(testWeather).toBe("Philadelphia"); //make sure weather info is for Philadelphia
      expect(result.statusCode).toEqual(200);
    });

    it("Specific station request", async () => {
        const result = await request(app).get("/api/v1/stations?kioskId=3004&at=2021-05-29T06:56:28.712"); 

        expect(result.body.stations.length).toBe(1); //make sure only snapshot for only one kiosk is received
        expect(result.body.stations[0].kioskId).toBe(3004); //make sure we got the snapshot for the kiosk that was requested for
        expect(result.statusCode).toEqual(200);
    });
});