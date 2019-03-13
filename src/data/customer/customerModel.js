const S = require('sequelize');
import groupTypes from '../generic/groupTypes';

export default db => {
	return db.define('customers', {
		surName: {
			type: S.STRING,
			allowNull: false,
		},
		lastName: {
			type: S.STRING,
			allowNull: false,
		},
		groupType: {
			type: S.ENUM({ values: groupTypes }),
			allowNull: false,
		},
		birthDate: {
			type: S.DATE,
			allowNull: true,
		},
	});
};
