const S = require('sequelize');

export default db => {
	return db.define('newsletters', {
		email: {
			type: S.STRING,
			allowNull: false,
			unique: true,
		},
	});
};
