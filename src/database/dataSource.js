const { DataSource } = require('apollo-datasource');
const Sequelize = require('sequelize');

import getCustomerModel from './customers/customerModel';
import getGroupModel from './groups/groupModel';
import getProductModel from './products/productModel';
import getWikiModel from './wikis/wikiModel';

class DB extends DataSource {
	constructor() {
		super();
		this.store = createStore();
	}

	async getWikis() {
		return await this.store.wikis.findAll({ where: { id: 12 } });
	}

	// async getMovieLikes({ user }) {
	// 	return await this.store.likes.findAll({ where: { user } });
	// }

	// async toggleMovieLike({ id, user }) {
	// 	const like = await this.store.likes.find({
	// 		where: {
	// 			user,
	// 			movie: id,
	// 		},
	// 	});
	// 	if (!like) await this.store.likes.create({ user, movie: id });
	// 	else await this.store.likes.destroy({ where: { user, movie: id } });
	// }

	// async isMovieLiked({ id, user }) {
	// 	const like = await this.store.likes.find({
	// 		where: { user, movie: id },
	// 	});
	// 	return !!like;
	// }
}

const createStore = async () => {
	const db = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		operatorsAliases: false,
		dialectOptions: {
			ssl: true,
		},
	});
	console.log(
		'I WILL LOGIN NOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW\n\n\n\n\n',
	);

	await db
		.authenticate()
		.catch(err => console.error('CANNOT AUTHENTICATE :\n', err));

	// Generate the PostgreSQL models.
	const Customer = getCustomerModel(db);
	const Group = getGroupModel(db);
	const Product = getProductModel(db);
	const Wiki = getWikiModel(db);

	// Link the models.
	Customer.belongsTo(Group);
	Group.hasMany(Customer);

	Product.belongsTo(Wiki);
	Wiki.hasMany(Product);

	// Synchronyze these models with the DB.
	// await db.sync({ force: true });
	await db.sync();

	// const likes = sequelize.define('like', {
	// 	user: Sequelize.STRING,
	// 	movie: Sequelize.STRING,
	// });

	return { Customer, Group, Product, Wiki };
};

export default DB;
