const S = require('sequelize');

export default db => {
	return db.define('cart_items', {
		// product_ref: {
		// 	type: S.STRING,
		// 	references: {
		// 		model: db.models.products,
		// 		key: 'ref',
		// 	},
		// 	allowNull: true,
		// },
	});
};
