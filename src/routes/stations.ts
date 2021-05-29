//module that handles API calls to the stations endpoint

import logger from 'lib-logger';
import {regularObject} from '../types/regularObject';
import {timeNotProvidedError} from '../errors/timeNotProvided';
import {SnapshotNotFoundError} from '../errors/snapshotNotFound';
import {findAllStations, findStationByKioskId} from '../db';


/**
 * Function that returns station snapshot for all stations at a specified time 
 * or specific station by kioskId at a specific time 
 * @param {object }requestData (query string params)
 * @returns {Promise}
 */
const findStations = async(requestData: regularObject) : Promise<any> => {
    if(!requestData.at){
        throw new timeNotProvidedError('Time is not specified!');
    }

    let result: regularObject;
    if(requestData.kioskId){
        let kioskId: number = parseInt(requestData.kioskId);
        [result] = await findStationByKioskId(requestData.at, kioskId);
    }
    else{
        [result] = await findAllStations(requestData.at);
    }

    if(!result){
        throw new SnapshotNotFoundError('Requested snapshot not available in the database');
    }
    logger.info('Successfully retrieved station data from the database', {result});
    return result;
}

export {findStations}