const S = require('sequelize');
import _ from 'lodash';

import customerModel from './customer/customerModel';
import groupModel from './group/groupModel';
import productModel from './product/productModel';
import wikiProductModel from './wiki_product/wikiProductModel';
import wikiPackModel from './wiki_pack/wikiPackModel';
import newsletterModel from './newsletter/newsletterModel';
import packModel from './pack/packModel';
import cartItemModel from './cart_item/cartItemModel';
import userModel from './user/userModel';
import log from '../helpers/log';
import logDbAssociations from '../helpers/logDbAssociations';

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
			logging: text =>
				typeof text === 'string' ? log.dim(text) : console.info(text),
		});
	}

	// Connect to the db.
	async initializeDb() {
		await this.db
			.authenticate()
			.then(() =>
				log.ok('✪ Connection to POSTGRES has been established.'),
			)
			.catch(err => {
				log.error('CANNOT AUTHENTICATE :\n', err);
				throw err;
			});

		// Define and link the Sequelize models.
		const User = userModel(this.db);
		const Customer = customerModel(this.db);

		const Group = groupModel(this.db);

		const Product = productModel(this.db);
		const WikiProduct = wikiProductModel(this.db);

		const Pack = packModel(this.db);
		const PackWiki = wikiPackModel(this.db);

		const Newsletters = newsletterModel(this.db);
		const CartItem = cartItemModel(this.db);

		User.belongsTo(Customer);
		Customer.belongsTo(Group);
		Product.belongsTo(WikiProduct, {
			foreignKey: 'wiki_product_id',
			targetKey: 'id',
			as: 'WikiProduct',
		});
		Pack.belongsTo(PackWiki, {
			foreignKey: 'wiki_pack_id',
			targetKey: 'id',
			as: 'WikiPack',
		});
		User.hasMany(CartItem, {
			as: { singular: 'CartItem', plural: 'CartItems' },
		});
		CartItem.belongsTo(Product);

		await this.db.sync();

		testCartInsertion({ User, CartItem, Product });

		logDbAssociations(this.db.models);

		// Synchronyze these models with the DB.
		await this.db.sync();
		return;
	}
}

export default new DB();

const testCartInsertion = async ({ User, CartItem, Product }) => {
	const sampleUser = await User.findOne({});
	if (sampleUser) {
		const allProducts = await Product.findAll({});
		const sampleProduct = _.sample(allProducts);
		const sampleCartItem = await CartItem.create({
			product_id: sampleProduct.id,
			user_id: sampleUser.id,
		});
		await sampleUser.addCartItem(sampleCartItem);
		const sampleItems = await sampleUser.getCartItems();
	}
};
