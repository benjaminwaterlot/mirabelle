const S = require('sequelize');
import userRoles from './userRoles';

export default db => {
	return db.define('users', {
		id: {
			type: S.STRING,
			allowNull: false,
			primaryKey: true,
		},
		customer_id: {
			type: S.INTEGER,
		},
		role: {
			type: S.ENUM(userRoles),
			allowNull: false,
		},
		email: {
			type: S.STRING,
			allowNull: false,
		},
		phone: {
			type: S.STRING,
			allowNull: false,
		},
	});
};
