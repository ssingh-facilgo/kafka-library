import ILogger from "./ILogger";
import { WinstonLogger } from "./WinstonLogger";
import Config from "./Index";

export class LoggerFactory {

	private static iLogger: ILogger;

	public static createLogger(type?: string): ILogger {
		type = type || Config.LoggerConfig.type;

		switch (type) {
			case "winston":
				return new WinstonLogger();
			default:
				throw new Error("No logger implemented");
		}
	}

	public static getLogger(): ILogger {
		if (!this.iLogger) {
			this.iLogger = this.createLogger();
		}
		return this.iLogger;
	}

}
