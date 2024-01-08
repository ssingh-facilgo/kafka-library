/* eslint-disable @typescript-eslint/consistent-type-definitions */
interface ILogger {
    info(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
    http(message: string): void;
}

export default ILogger;
