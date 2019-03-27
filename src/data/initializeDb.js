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
		User.belongsTo(Customer);

		const Group = groupModel(this.db);
		Customer.belongsTo(Group);

		const Product = productModel(this.db);
		const WikiProduct = wikiProductModel(this.db);
		Product.belongsTo(WikiProduct, {
			foreignKey: 'wiki_product_ref',
			targetKey: 'ref',
			as: 'WikiProduct',
		});

		const Pack = packModel(this.db);
		const PackWiki = wikiPackModel(this.db);
		Pack.belongsTo(PackWiki, {
			foreignKey: 'wiki_pack_ref',
			targetKey: 'ref',
			as: 'WikiPack',
		});

		const Newsletters = newsletterModel(this.db);
		const CartItem = cartItemModel(this.db);

		User.hasMany(CartItem, { as: 'CartItem' });
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
		const sampleCartItem = await CartItem.create();
		const allProducts = await Product.findAll({});
		await sampleCartItem.setProduct(_.sample(allProducts));
		await sampleUser.addCartItem(sampleCartItem);
		const sampleItems = await sampleUser.getCartItem();
		log.dim(`The user ${sampleUser.email} has in his cart: `, sampleItems);
	}
};
