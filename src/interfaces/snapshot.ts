import {Stations} from './stations';
import {Weather} from './weather';

/*
The snapshot interface defines the structure
of the payload that will be saved on the database
*/
export interface Snapshot{
    at: (Date | undefined); //at can be undefined since we will be using default db time on insert
    stations: Stations;
    weather: Weather;
}