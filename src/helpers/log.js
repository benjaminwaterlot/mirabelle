const chalk = require('chalk');

const refine = inputs => {
	return inputs.map(input => checkIfObj(input));
};

const checkIfObj = input => {
	if (typeof input === 'object' && input)
		return JSON.stringify(input, null, 2);
	return input;
};

export default {
	toStr: obj => JSON.stringify(obj),
	error: (...input) => console.log(chalk.red.bold(...refine(input))),
	ok: (...input) => console.log(chalk.green.bold(...refine(input))),
	info: (...input) => console.log(chalk.blue(...refine(input))),
	dim: (...input) => console.log(chalk.dim(...refine(input))),
};
