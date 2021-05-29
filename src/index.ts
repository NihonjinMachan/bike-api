import express from 'express';
import logger from 'lib-logger';
import config from 'config';
import httpError from 'http-errors';
import {errorHandler} from './utils';
import {findStations} from './routes/stations';
import {SnapshotNotFoundError} from './errors/snapshotNotFound';
import {timeNotProvidedError} from './errors/timeNotProvided';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//middleware that authenticates incoming requests
function auth(req, res, next){
    let token:string = req.headers['api-token'];
    if((!token || token !== config.get('apiToken')) && process.env.NODE_ENV !== 'test'){
        throw new httpError(401, 'Invalid token received. Please try again..');
    }
    return next();
}

//basic health check for the server
app.get('/hc', (req, res) => { 
  res.send('The bike app is alive and healthy!');
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './public'});
});

app.get('/api/v1/stations', auth, (req, res, next) => {
    findStations(req.query)
    .then(result => res.status(200).json(result))
    .catch(err => {
        logger.error('Failed to find station snapshot', err);
        if(err instanceof SnapshotNotFoundError){
            return next(httpError(404, 'Station snapshot not found in the database'));
        }
        else if(err instanceof timeNotProvidedError){
            return next(httpError(400, 'Time not specified!'));
        }
        throw err;
    });
});

errorHandler(app);
app.listen(process.env.PORT || 5000, () => {
  return logger.info(`server is listening on ${process.env.PORT || 5000}`);
});

export {app}