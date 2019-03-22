const S = require('sequelize');
import wikiProductData from '../src/data/wiki_product/wikiProductData.json';
import productData from '../src/data/product/productData.json';
import packData from '../src/data/pack/packData.json';
import customerData from '../src/data/customer/customerData.json';
import wikiPackData from '../src/data/wiki_pack/wikiPackData.json';
import DB from '../src/data/initializeDb';

(async () => {
	await DB.initializeDb();
	const db = DB.db;

	await db.sync({ force: true });

	await db.models.wiki_products
		.bulkCreate(wikiProductData)
		.catch(err => console.error(err, err.parent.detail));

	await db.models.products
		.bulkCreate(productData)
		.catch(err => console.error(err, err.parent.detail));

	await db.models.wiki_packs
		.bulkCreate(wikiPackData)
		.catch(err => console.error(err, err.parent.detail));

	await db.models.packs
		.bulkCreate(packData)
		.catch(err => console.error(err, err.parent.detail));

	await db.models.customers
		.bulkCreate(customerData)
		.catch(err => console.error(err, err.parent.detail));

	console.log('DONE :)');
	process.exit(0);
})();
