/* No need for @typescript-eslint/consistent-type-definitions in JavaScript */

/**
 * @interface
 */
const ILogger = {
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

// module.exports = {ILogger};
