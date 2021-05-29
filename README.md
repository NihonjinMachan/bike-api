# bike-api
API server that fetches biking info and returns historical data for the stations

## Introduction:
My aim with this project was to simplify it as much as possible by doing a lot with lesser lines of code. In my opinion, the lesser the lines of code the more error-free it is. Hence, I took the decision to use 1 API endpoint along with a scheduled job instead of 3 endpoints mentioned in the requirements to complete the tasks.

## Scheduled Job:
The task of fetching Indego and Weather data and dumping them into the database is fulfiled by a job that runs on a scheduler in Heroko. It was something new to me and found it cool to implement in this project to learn something new.
The job runs once every hour, makes API calls to the Indego and Open Weather endpoints, formats the data appropriately and saves to the database.
Note that all keys present in the raw data are not stored for the sake of being concise and only important ones are extracted and stored. Interfaces were used to make sure the saved data is of the right format and hold the required keys/values.
The main interface is the `Snapshot` interface as seen below. Objects of interface Snapshot are stored in the database.

### Snapshot:
```
interface Snapshot{
    at: (Date | undefined);
    stations: Stations;
    weather: Weather;
}
```
 The Snapshot interface consists of two other interfaces `Stations` and `Weather` 
 
 ### Stations: 
 An array of objects containing station data
 ```
 interface Stations{
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
```

### Weather:
An object containing weather data
```
interface Weather{
    name: string;
    temp: number;
    description: string;
    tempMin: number;
    tempMax: number;
    humidity: number;
    visibility: number;
}
```

## Stations API:
```
GET api/v1/stations?kioskId=<kioskId>&at=<time>
kioskId (optional)
time (required)
```
#### Statuses:
  - 200: Success
  - 400: Missing time
  - 401: Missing token
  - 404: Data not found

#### Description:
This is the main endpoint that the fetches data from the database and returns to the user. This endpoint can perform one one of two tasks:
- Fetch all station data for a given time (if kioskId is missing). 
- Fetch data for a specific station at a given time (if kioskId is present)

Data returned is in the same format that we save, i.e. Snapshot interface. The only difference being that function with kioskId returns a `stations` array with a single element that being the station object corresponding to the kioskId whereas in the other case the stations array contains data for all the stations. 
The `weather` object remains the same for both cases.

## N.B.
Unfortunately, I was not able to document the API in Swagger due to a lack of familiarity with it. I have tried my best to document the API in this ReadMe file as well as included a postman collection with the endpoint with the two possible cases.
