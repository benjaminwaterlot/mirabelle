const S = require('sequelize');

export default db => {
	return db.define('baskets', {
		ref: { type: S.STRING, unique: true },
	});
};
