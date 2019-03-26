const S = require('sequelize');
import wikiProductData from '../src/data/wiki_product/wikiProductData.json';
import productData from '../src/data/product/productData.json';
import packData from '../src/data/pack/packData.json';
import customerData from '../src/data/customer/customerData.json';
import userData from '../src/data/user/userData.json';

import wikiPackData from '../src/data/wiki_pack/wikiPackData.json';
import DB from '../src/data/initializeDb';
import log from '../src/helpers/log';

(async () => {
	await DB.initializeDb();
	const db = DB.db;

	await db.sync({ force: true });

	await db.models.wiki_products
		.bulkCreate(wikiProductData)
		.catch(err => log.error(err));

	await db.models.products
		.bulkCreate(productData)
		.catch(err => log.error(err));

	await db.models.wiki_packs
		.bulkCreate(wikiPackData)
		.catch(err => log.error(err));

	await db.models.packs.bulkCreate(packData).catch(err => log.error(err));

	await db.models.customers
		.bulkCreate(customerData)
		.catch(err => log.error(err));

	await db.models.users.bulkCreate(userData).catch(err => log.error(err));

	log.ok('DONE :)');
	process.exit(0);
})();
