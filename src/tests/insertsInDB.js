const _ = require('lodash');

import { insertCustomers, setCustomerGroups } from './testCustomers';
import { insertGroups } from './testGroups';
// import { insertProducts, setProductWikis } from './testProducts';
// import { insertWikis } from './testWikis';

import productsdb from '../../standalone/productsdb.json';
import wikisdb from '../../standalone/productsdb.json';

export default async db => {
	const allCustomers = await insertCustomers(db.models);
	const allGroups = await insertGroups(db.models);
	await setCustomerGroups(allCustomers, allGroups);

	db.models.products.bulkCreate(productsdb);
	db.models.wikis.bulkCreate(wikisdb);
	// const allProducts = await insertProducts(db.models);
	// const allWikis = await insertWikis(db.models);
	// await setProductWikis(allProducts, allWikis);
};
