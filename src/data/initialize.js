const S = require('sequelize');

import getCustomerModel from './customer/customerModel';
import getGroupModel from './group/groupModel';
import getProductModel from './product/productModel';
import getWikiModel from './wiki/wikiModel';
import getNewsletterModel from './newsletter/newsletterModel';

class DB {
	constructor() {
		this.db = new S(process.env.DATABASE_URL, {
			dialect: 'postgres',
			operatorsAliases: false,
			dialectOptions: {
				ssl: true,
			},
		});
		this.initializeDb(this.db);
	}
	async initializeDb(db) {
		await db
			.authenticate()
			.then(() =>
				console.log('✪ Connection to POSTGRES has been established.'),
			)
			.catch(err => {
				console.error('CANNOT AUTHENTICATE :\n', err);
				throw err;
			});

		const Customer = getCustomerModel(db);
		const Group = getGroupModel(db);
		const Product = getProductModel(db);
		const Wiki = getWikiModel(db);
		// const Newsletters = getNewsletterModel(db);

		// Link the models.
		Customer.belongsTo(Group);
		Group.hasMany(Customer);

		Product.belongsTo(Wiki);
		Wiki.hasMany(Product);

		// Synchronyze these models with the DB.
		await db.sync();
	}
}

export default new DB();
