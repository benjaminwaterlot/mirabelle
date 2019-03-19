const S = require('sequelize');
import wikiData from '../src/data/wiki/wikiData.json';
import productData from '../src/data/product/productData.json';
// import packData from '../src/data/pack/packData.json';
import DB from '../src/data/initializeDb';

const main = async () => {
	await DB.initializeDb();
	await DB.db.sync({ force: true });

	await DB.db.models.wikis.bulkCreate(wikiData);

	await DB.db.models.products.bulkCreate(productData);

	// await DB.db.models.packs.bulkCreate(packData);
};

main();

export default main;
