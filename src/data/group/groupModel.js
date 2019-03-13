const S = require('sequelize');

export default db => {
	return db.define('groups', {
		groupType: {
			type: S.STRING,
			allowNull: false,
		},
	});
};
