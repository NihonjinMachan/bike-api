"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const lib_logger_1 = __importDefault(require("lib-logger"));
const config_1 = __importDefault(require("config"));
const http_errors_1 = __importDefault(require("http-errors"));
const utils_1 = require("./utils");
const stations_1 = require("./routes/stations");
const snapshotNotFound_1 = require("./errors/snapshotNotFound");
const timeNotProvided_1 = require("./errors/timeNotProvided");
const app = express_1.default();
exports.app = app;
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//middleware that authenticates incoming requests
function auth(req, res, next) {
    let token = req.headers['api-token'];
    if ((!token || token !== config_1.default.get('apiToken')) && process.env.NODE_ENV !== 'test') {
        throw new http_errors_1.default(401, 'Invalid token received. Please try again..');
    }
    return next();
}
//basic health check for the server
app.get('/hc', (req, res) => {
    res.send('The bike app is alive and healthy!');
});
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});
app.get('/api/v1/stations', auth, (req, res, next) => {
    stations_1.findStations(req.query)
        .then(result => res.status(200).json(result))
        .catch(err => {
        lib_logger_1.default.error('Failed to find station snapshot', err);
        if (err instanceof snapshotNotFound_1.SnapshotNotFoundError) {
            return next(http_errors_1.default(404, 'Station snapshot not found in the database'));
        }
        else if (err instanceof timeNotProvided_1.timeNotProvidedError) {
            return next(http_errors_1.default(400, 'Time not specified!'));
        }
        throw err;
    });
});
utils_1.errorHandler(app);
app.listen(port, () => {
    return lib_logger_1.default.info(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map