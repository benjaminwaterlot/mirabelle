const S = require('sequelize');

export default db => {
	return db.define('cart_items', {
		product_ref: {
			type: S.STRING,
		},
		user_id: {
			type: S.STRING,
		},
	});
};
