import logger from 'lib-logger';

//simple error handler that returns a json error
let errorHandler: (app: any) => void = (app) => {
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        logger.error(err.message);
        res.status(statusCode).send({
            statusCode: statusCode,
            message: err.message ? err.message : "Internal Server Error",
        });
    });
}

export { errorHandler }