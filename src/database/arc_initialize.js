const S = require('sequelize');

import getCustomerModel from './customers/customerModel';
import getGroupModel from './groups/groupModel';
import getProductModel from './products/productModel';
import getWikiModel from './wikis/wikiModel';

import insertsInDB from '../tests/insertsInDB';

// const db = new S(process.env.DATABASE_URL, {
// 	dialect: 'postgres',
// 	operatorsAliases: false,
// 	dialectOptions: {
// 		ssl: true,
// 	},
// });

const DEBUG = true;

// export default async () => {
// 	// Authenticate to the db
// 	await db
// 		.authenticate()
// 		.catch(err => console.error('CANNOT AUTHENTICATE :\n', err));

// 	// Generate the PostgreSQL models.
// 	const Customer = getCustomerModel(db);
// 	const Group = getGroupModel(db);
// 	const Product = getProductModel(db);
// 	const Wiki = getWikiModel(db);
// 	if (!DEBUG) return db;

// 	// Link the models.
// 	Customer.belongsTo(Group);
// 	Group.hasMany(Customer);

// 	Product.belongsTo(Wiki);
// 	Wiki.hasMany(Product);

// 	// Synchronyze these models with the DB.
// 	// await db.sync({ force: true });
// 	await db.sync();

// 	// Insert fake infos for testing.
// 	// await insertsInDB(db);

// 	// Return the database, which is now queryable.
// 	return db;
// };
