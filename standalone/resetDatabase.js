const S = require('sequelize');
import wikiData from '../src/data/wiki/wikiData.json';
import productData from '../src/data/product/productData.json';
import packData from '../src/data/pack/packData.json';
import packWikiData from '../src/data/pack_wiki/packWikiData.json';
import DB from '../src/data/initializeDb';

const main = async () => {
	await DB.initializeDb();
	await DB.db.sync({ force: true });

	await DB.db.models.wikis
		.bulkCreate(wikiData)
		.catch(err => console.error(err, err.parent.detail));

	await DB.db.models.products
		.bulkCreate(productData)
		.catch(err => console.error(err, err.parent.detail));

	await DB.db.models.packwikis
		.bulkCreate(packWikiData)
		.catch(err => console.error(err, err.parent.detail));

	await DB.db.models.packs
		.bulkCreate(packData)
		.catch(err => console.error(err, err.parent.detail));
};

main();

export default main;
