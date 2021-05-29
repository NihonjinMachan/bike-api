//this module handles db connection as well as all db interactions

import mongoose from 'mongoose';
import config from 'config';
import logger from 'lib-logger';
import moment from 'moment';
import {regularObject} from './types/regularObject';
import {snapshotModel} from './models/snapshot';
import {Snapshot} from './interfaces/snapshot';

const db = config.get('mongoURI');

//establish mongodb connection
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
.then(() => logger.info("DB connection successful"))
.catch((err) => logger.error("DB connection failed", {err}));

/**
 * Function that takes formatted API data, turns into an object of interface Snapshot and saves to the db
 * @param {object} data 
 * @returns {Promise}
 */
const saveData = async(data: regularObject): Promise<any> => {
    const dataToAdd: Snapshot = {
        at: undefined,
        stations: data.stations,
        weather: data.weather,
    };
    const newRecord = new snapshotModel(dataToAdd);
    return newRecord.save();
}

/**
 * Function that returns snapshot data for all kiosks at a given time
 * @param {string} at
 * @returns {Promise}
 */
const findAllStations = async(at: string): Promise<any> => {
    let dbTime: Date = moment(at).utcOffset(0, true).toDate(); //assumes that the provided timezone in the request is already in UTC thereby preventing further conversions
    return snapshotModel.find({at: { $gte: dbTime}}, {at: 1, stations: 1, weather: 1, _id: 0}).limit(1);
}

/**
 * Function that returns snapshot data for a specific kiosk at a given time
 * @param {string} at
 * @returns {Promise}
 */
const findStationByKioskId = async(at: string, kioskId: number): Promise<any> => {
    let dbTime: Date = moment(at).utcOffset(0, true).toDate();
    return snapshotModel.find(
        {$and: [
            {at: { $gte: dbTime}},
            {"stations.kioskId" : kioskId}
        ]},
        {
            at: 1,
            stations: {$elemMatch: {kioskId: kioskId}},
            weather: 1,
            _id: 0,
        }
    ).limit(1);
}

export {saveData, findAllStations, findStationByKioskId};



