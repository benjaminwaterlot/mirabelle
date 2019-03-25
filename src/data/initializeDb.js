const S = require('sequelize');
const chalk = require('chalk');

import getCustomerModel from './customer/customerModel';
import getGroupModel from './group/groupModel';
import getProductModel from './product/productModel';
import getWikiProductsModel from './wiki_product/wikiProductModel';
import getWikiPackModel from './wiki_pack/wikiPackModel';
import getNewsletterModel from './newsletter/newsletterModel';
import getPackModel from './pack/packModel';
import getCartItemModel from './cart_item/cartItemModel';

const getDbUrl = () => {
	const env = process.env.NODE_ENV;
	const dbUrl =
		env === 'production'
			? process.env.DATABASE_URL
			: process.env.HEROKU_POSTGRESQL_CRIMSON_URL;
	if (!dbUrl)
		throw new Error(
			'✗ ERROR : you launched the server with `npm start` instead of `npm run dev`',
		);
	return dbUrl;
};

class DB {
	constructor() {
		this.db = new S(getDbUrl(), {
			dialect: 'postgres',
			operatorsAliases: false,
			dialectOptions: {
				ssl: true,
			},
			define: {
				underscored: true,
			},
			logging: text => console.log(chalk.dim(text)),
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
		// Group.hasMany(Customer);

		const Product = getProductModel(this.db);
		const Wiki = getWikiProductsModel(this.db);
		Product.belongsTo(Wiki, {
			foreignKey: 'wiki_product_ref',
			targetKey: 'ref',
		});

		const Pack = getPackModel(this.db);
		const PackWiki = getWikiPackModel(this.db);
		Pack.belongsTo(PackWiki, {
			foreignKey: 'wiki_pack_ref',
			targetKey: 'ref',
		});

		const Newsletters = getNewsletterModel(this.db);

		const CartItem = getCartItemModel(this.db);
		// CartItem.hasOne(Customer);
		Customer.hasMany(CartItem, { as: 'CartItem' });

		CartItem.belongsTo(Product);

		await this.db.sync();

		const sampleCustomer = await Customer.findOne({
			where: { surname: 'Benjamin' },
		});
		const sampleCartItem = await CartItem.create();
		await sampleCartItem.setProduct(await Product.findOne({}));
		await sampleCustomer.addCartItem(sampleCartItem);
		const sampleItems = await sampleCustomer.getCartItem();

		//
		//
		// OLD BASKET IMPLEMENTATION
		// Product.belongsToMany(Customer, {
		// 	through: 'baskets',
		// });
		// Customer.belongsToMany(Product, {
		// 	through: 'baskets',
		// 	as: 'BasketProduct',
		// });

		// await this.db.sync();

		// const sampleProduct = await Product.findOne({
		// 	where: { ref: 'FLBANAN0CR' },
		// });
		// const sampleCustomer = await Customer.findOne({});
		// await sampleCustomer.addBasketProduct(await Product.findOne({}));
		// OLD BASKET IMPLEMENTATION
		//
		//

		// Synchronyze these models with the DB.
		await this.db.sync();
		return;
	}
}

export default new DB();
