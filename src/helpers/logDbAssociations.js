import log from './log';

export default models => {
	for (let model of Object.keys(models)) {
		if (!models[model].name) continue;

		log.ok(
			'\n\n----------------------------------\n',
			models[model].name,
			'\n----------------------------------',
		);

		log.info('\nAttributes');
		for (let attr of Object.keys(models[model].attributes)) {
			console.log(models[model].name + '.' + attr);
		}

		log.info('\nAssociations');
		for (let assoc of Object.keys(models[model].associations)) {
			for (let accessor of Object.keys(
				models[model].associations[assoc].accessors,
			)) {
				console.log(
					models[model].name +
						'.' +
						models[model].associations[assoc].accessors[accessor] +
						'()',
				);
			}
		}

		// console.log('\nCommon');
		// for (let func of Object.keys(
		// 	models[model].Instance.super_.prototype,
		// )) {
		// 	if (func === 'constructor' || func === 'sequelize') continue;
		// 	console.log(models[model].name + '.' + func + '()');
		// }
	}
};
