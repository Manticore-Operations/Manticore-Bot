const { utcNow } = require('../helpers/date');
const chalk = require('chalk');

const DELIM = ' - ';

class Logger {

	#logMessage(message) {
		process.stdout.write(message + '\n');
	}

	#formatMessage() {
		let str = `${utcNow()}`;
		for (const arg of Object.values(arguments)) {
			str = str.concat(DELIM, arg);
		}
		return str;
	}

	log() {
		const msg = this.#formatMessage(...arguments);
		this.#logMessage(msg);
	}

	error() {
		const msg = this.#formatMessage(...arguments);
		this.#logMessage(chalk.red(msg));
	}
}

module.exports = {
	Logger,
};