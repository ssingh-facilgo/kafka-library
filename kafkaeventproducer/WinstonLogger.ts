import winston from 'winston'
import ILogger from "./ILogger";

export class WinstonLogger implements ILogger {

	constructor() {

		const levels = {
			error: 0,
			warn: 1,
			info: 2,
			http: 3,
			debug: 4,
		};

		const level = () => {
			return 'debug'
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

		let transports: any;
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
			]
		}

		winston.configure({
			level: level(),
			levels,
			format,
			transports,
		});

	}

	public info(message: string): void {
		winston.info(message);
	}

	public error(message: string): void {
		winston.error(message);
	}

	public warn(message: string): void {
		winston.warn(message);
	}

	public debug(message: string): void {
		winston.debug(message);
	}

	public http(message: string): void {
		winston.http(message);
	}

}
