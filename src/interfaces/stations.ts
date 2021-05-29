/*
The stations interface defines the
structure of a station. Note that
all available station attributes were 
not used.
*/
export interface Stations{
    [index: number]: {kioskId: number,
    name: string,
    addressStreet: string,
    addressCity: string,
    latitude: number,
    longitude: number,
    totalDocks: number,
    docksAvailable: number,
    bikesAvailable: number};
}
