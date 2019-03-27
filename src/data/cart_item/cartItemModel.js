const S = require('sequelize');

export default db => {
	return db.define('cart_items', {
		product_id: {
			type: S.STRING,
			allowNull: false,
		},
		user_id: {
			type: S.STRING,
		},
	});
};
