const S = require('sequelize');
import wikiProductData from '../src/data/wiki_product/wikiProductData.json';
import productData from '../src/data/product/productData.json';
import packData from '../src/data/pack/packData.json';
import customerData from '../src/data/customer/customerData.json';
import userData from '../src/data/user/userData.json';
import groupData from '../src/data/group/groupData.json';

import wikiPackData from '../src/data/wiki_pack/wikiPackData.json';
import DB from '../src/data/initializeDb';
import log from '../src/helpers/log';

(async () => {
	await DB.initializeDb();
	const models = DB.db.models;

	await DB.db.sync({ force: true });

	await models.wiki_products
		.bulkCreate(wikiProductData)
		.catch(err => log.error(err));

	await models.products.bulkCreate(productData).catch(err => log.error(err));

	await models.wiki_packs
		.bulkCreate(wikiPackData)
		.catch(err => log.error(err));

	await models.packs.bulkCreate(packData).catch(err => log.error(err));

	await models.groups.bulkCreate(groupData).catch(err => log.error(err));

	await models.customers
		.bulkCreate(customerData)
		.catch(err => log.error(err));

	await models.users.bulkCreate(userData).catch(err => log.error(err));

	log.ok('DONE :)');
	process.exit(0);
})();
