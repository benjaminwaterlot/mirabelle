const S = require('sequelize');

import getCustomerModel from './customer/customerModel';
import getGroupModel from './group/groupModel';
import getProductModel from './product/productModel';
import getWikiModel from './wiki/wikiModel';
import getNewsletterModel from './newsletter/newsletterModel';
import getPackModel from './pack/packModel';
import getPackWikiModel from './pack_wiki/packWikiModel';

class DB {
	constructor() {
		this.db = new S(process.env.HEROKU_POSTGRESQL_CRIMSON_URL, {
			dialect: 'postgres',
			operatorsAliases: false,
			dialectOptions: {
				ssl: true,
			},
			// logging: false,
		});
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

		// Define and link the Sequelize models.
		const Customer = getCustomerModel(this.db);
		const Group = getGroupModel(this.db);
		Customer.belongsTo(Group);
		Group.hasMany(Customer);

		const Product = getProductModel(this.db);
		const Wiki = getWikiModel(this.db);
		Product.belongsTo(Wiki, { foreignKey: 'wiki_ref', targetKey: 'ref' });
		Wiki.hasMany(Product);

		const Pack = getPackModel(this.db);
		const PackWiki = getPackWikiModel(this.db);
		Pack.belongsTo(PackWiki, {
			foreignKey: 'pack_wiki_ref',
			targetKey: 'ref',
		});
		// PackWiki.hasMany(Pack);

		const Newsletters = getNewsletterModel(this.db);

		// Link the models.

		// Synchronyze these models with the DB.
		await this.db.sync();
		return true;
	}
}

export default new DB();
