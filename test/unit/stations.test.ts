import {findStations} from '../../src/routes/stations';
import * as db from '../../src/db';
import {timeNotProvidedError} from '../../src/errors/timeNotProvided';
import {SnapshotNotFoundError} from '../../src/errors/snapshotNotFound';

describe('Stations test', () => {
    it('Should throw an error if no time is passed', async () => {
        await expect(findStations({})).rejects.toThrow(timeNotProvidedError);
    });

    it('Should call the findStationByKioskId function if kioskId is passed', async () => {
        jest.spyOn(db, 'findStationByKioskId').mockResolvedValue([1]);
        jest.spyOn(db, 'findAllStations').mockResolvedValue([1]);

        await findStations({at:'2021-05-29T06:56:28.712', kioskId: 3004});
        expect(db.findStationByKioskId).toBeCalledTimes(1);
        expect(db.findAllStations).toBeCalledTimes(0);
    });

    it('Should call the findAllStations function if kioskId is not passed', async () => {
        jest.spyOn(db, 'findStationByKioskId').mockResolvedValue([1]);
        jest.spyOn(db, 'findAllStations').mockResolvedValue([1]);

        await findStations({at:'2021-05-29T06:56:28.712'});
        expect(db.findStationByKioskId).toBeCalledTimes(0);
        expect(db.findAllStations).toBeCalledTimes(1);
    });

    it('Should throw an error if no result is found', async () => {
        jest.spyOn(db, 'findStationByKioskId').mockResolvedValue([]);
        jest.spyOn(db, 'findAllStations').mockResolvedValue([]);

        await expect(findStations({at:'2021-05-29T06:56:28.712', kioskId: 3004})).rejects.toThrow(SnapshotNotFoundError);
    });
});