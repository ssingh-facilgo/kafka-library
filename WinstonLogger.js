const winston = require('winston');

class WinstonLogger {
    constructor() {
        const levels = {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            debug: 4,
        };

        const level = () => {
            return 'debug';
        };

        const colors = {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            http: 'magenta',
            debug: 'cyan',
        };

        winston.addColors(colors);

        const format = winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
            winston.format.colorize({ all: true }),
            winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
        );

        let transports;
        if (process.env.NODE_ENV === 'development') {
            transports = [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                }),
                new winston.transports.File({ filename: 'logs/all.log' })
            ];
        } else {
            const httpTransportOptions = {
                host: 'http-intake.logs.datadoghq.com',
                path: `/api/v2/logs?dd-api-key=${process.env.DATADOG_KEY}&ddsource=nodejs&service=${process.env.DATADOG_SERVICE}`,
                ssl: true
            };

            transports = [
                new winston.transports.Console(),
                new winston.transports.Http(httpTransportOptions)
            ];
        }

        winston.configure({
            level: level(),
            levels,
            format,
            transports,
        });
    }

    info(message) {
        winston.info(message);
    }

    error(message) {
        winston.error(message);
    }

    warn(message) {
        winston.warn(message);
    }

    debug(message) {
        winston.debug(message);
    }

    http(message) {
        winston.http(message);
    }
}

module.exports = WinstonLogger;
