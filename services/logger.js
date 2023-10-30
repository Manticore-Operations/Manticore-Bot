
const logLevels = ['error', 'warn', 'info', 'log', 'debug'];
const { utcNow } = require('../helpers/date');
class Logger {

    constructor(params) {
    }

    #logMessage(message) {
        process.stdout.write(message + '\n');
    } 
    log(message) {
        const del = ' - ';
        let str = `${utcNow()}`;
        for (const arg of Object.values(arguments)) {
            str = str.concat(del, arg);
        }
        this.#logMessage(str);
    }
}

module.exports = {
    Logger
};