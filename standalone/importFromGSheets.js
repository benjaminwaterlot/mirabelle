import log from '../src/helpers/log';

const GoogleSpreadsheet = require('google-spreadsheet');
const _ = require('lodash');
const { promisify } = require('util');

const doc = new GoogleSpreadsheet(
	'1cOJOCXelWvyKD3q8RMxIayzI8oLx1Bo_jp7E1l6yQ1E',
);

export default async () => {
	const info = await promisify(doc.getInfo)().catch(err => log.error(err));

	for (const sheet of info.worksheets) {
		console.log(sheet.title);
	}

	const tables = {};
	for (const sheet of info.worksheets) {
		console.log(`SEARCHING FOR ROWS IN ${sheet.title}`);
		const raw = await promisify(sheet.getRows)({});
		const rows = raw.map(original =>
			_.omit(original, ['id', '_xml', '_links', 'save', 'del']),
		);
		tables[sheet.title] = rows;
	}
	return tables;
	// let sheetsNumber = info.worksheets.length;
	// let isReady = new Promise((resolve, reject) => {
	// let db = {};
	// let promises = [];

	// for (const sheet of info.worksheets) {
	// 	const newPromise = new Promise((res, rej) => {sheet.getRows({}, (err, rawData) => {
	// 		if (err) throw Error(err);

	// 		const rows = rawData.map(original =>
	// 			_.omit(original, ['id', '_xml', '_links', 'save', 'del']),
	// 		);

	// 		db[sheet.title] = rows;
	// 		sheetsNumber--;
	// 		return rows;
	// 	}
	// 		// if (sheetsNumber === 0) resolve(db.products);
	// 	});
	// 	promises = [...promises, newPromise];
	// 	console.log(promises);
	// 	if (sheetsNumber === 0) console.log(promises);
	// }
	// return Promise.all(promises);
	// resolve(db.products);
	// });
	// return isReady;
};
