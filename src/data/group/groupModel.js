import groupTypes from './groupTypes';

const S = require('sequelize');

export default db => {
	return db.define('groups', {
		name: {
			type: S.STRING,
			allowNull: false,
		},
		group_type: {
			type: S.ENUM(groupTypes),
			allowNull: false,
		},
		street: {
			type: S.STRING,
		},
		additional: {
			type: S.STRING,
		},
		postalcode: {
			type: S.INTEGER,
		},
		city: {
			type: S.STRING,
		},
		country: {
			type: S.STRING,
		},
		// shipping_point_id: {
		// 	type: S.INTEGER,
		// 	validate: {
		// 		isRequiredIfShippingPoint(group_type, shipping_point_id) {
		// 			if (group_type === 'SHIPPING_POINT' && !shipping_point_id)
		// 				throw new Error(
		// 					'shipping_point_id is required for a shipping point.',
		// 				);
		// 			if (group_type !== 'SHIPPING_POINT' && shipping_point_id)
		// 				throw new Error(
		// 					`shipping_point_id is forbidden because ${group_type} is not a shipping point.`,
		// 				);
		// 		},
		// 	},
		// },
	});
};
