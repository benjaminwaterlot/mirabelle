const S = require('sequelize');

// const isRequiredIfShippingPoint =

export default db => {
	return db.define('groups', {
		group_type: {
			type: S.STRING,
			allowNull: false,
		},
		shipping_point_id: {
			type: S.INTEGER,
			validate: {
				isRequiredIfShippingPoint(group_type, shipping_point_id) {
					if (group_type === 'SHIPPING_POINT' && !shipping_point_id)
						throw new Error(
							'shipping_point_id is required for a shipping point.',
						);
					if (group_type !== 'SHIPPING_POINT' && shipping_point_id)
						throw new Error(
							`shipping_point_id is forbidden because ${group_type} is not a shipping point.`,
						);
				},
			},
		},
	});
};
