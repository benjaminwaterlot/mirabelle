const S = require('sequelize');

import getCustomerModel from './customer/customerModel';
import getGroupModel from './group/groupModel';
import getProductModel from './product/productModel';
import getWikiModel from './wiki/wikiModel';
import getNewsletterModel from './newsletter/newsletterModel';

class DB {
	constructor() {
		this.db = new S(process.env.HEROKU_POSTGRESQL_CRIMSON_URL, {
			dialect: 'postgres',
			operatorsAliases: false,
			dialectOptions: {
				ssl: true,
			},
			// logging: true,
		});
		// this.initializeDb(this.db);
	}

	// Connect to the db.
	async initializeDb() {
		await this.db
			.authenticate()
			.then(() =>
				console.log('✪ Connection to POSTGRES has been established.'),
			)
			.catch(err => {
				console.error('CANNOT AUTHENTICATE :\n', err);
				throw err;
			});

		// Define the Sequelize models.
		const Customer = getCustomerModel(this.db);
		const Group = getGroupModel(this.db);
		const Product = getProductModel(this.db);
		const Wiki = getWikiModel(this.db);
		const Newsletters = getNewsletterModel(this.db);

		// Link the models.
		Customer.belongsTo(Group);
		Group.hasMany(Customer);

		Product.belongsTo(Wiki, { foreignKey: 'wiki_ref', targetKey: 'ref' });
		Wiki.hasMany(Product);

		// Synchronyze these models with the DB.
		await this.db.sync();
		return true;
	}
}

export default new DB();
