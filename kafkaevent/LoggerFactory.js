const { WinstonLogger } = require("./WinstonLogger");

// const ILogger1 = require('./ILogger');

const ILogger1 = {
    info: function(message) {
        // Log an informational message
    },
    error: function(message) {
        // Log an error message
    },
    warn: function(message) {
        // Log a warning message
    },
    debug: function(message) {
        // Log a debug message
    },
    http: function(message) {
        // Log an HTTP-related message
    }
};

class LoggerFactory {
    static iLogger1 = ILogger1;

    static createLogger(type) {
        type = type || "winston";

        switch (type) {
            case "winston":
                return new WinstonLogger();
            default:
                throw new Error("No logger implemented");
        }
    }

    static getLogger() {
        if (!this.iLogger1) {
            this.iLogger1 = this.createLogger();
        }
        return this.iLogger1;
    }
}

module.exports = { LoggerFactory };
