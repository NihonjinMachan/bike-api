/*
The stations interface defines the
structure of weather for a given city. 
Note that all available station 
attributes were not used.
*/
export interface Weather{
    name: string;
    temp: number;
    description: string;
    tempMin: number;
    tempMax: number;
    humidity: number;
    visibility: number;
}