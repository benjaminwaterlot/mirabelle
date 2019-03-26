const S = require('sequelize');
import groupTypes from '../group/groupTypes';

export default db => {
	return db.define('customers', {
		surname: {
			type: S.STRING,
			allowNull: false,
		},
		lastname: {
			type: S.STRING,
			allowNull: false,
		},
		group_type: {
			type: S.ENUM({ values: groupTypes }),
			allowNull: false,
		},
		group_id: {
			type: S.INTEGER,
		},
		birthdate: {
			type: S.DATE,
		},
		landline_phone: {
			type: S.STRING,
		},
		mobile_phone: {
			type: S.STRING,
		},
		email: {
			type: S.STRING,
			allowNull: false,
		},
		can_pay_later: {
			type: S.BOOLEAN,
		},
		home_street: {
			type: S.STRING,
		},
		home_additional: {
			type: S.STRING,
		},
		home_postalcode: {
			type: S.STRING,
		},
		home_city: {
			type: S.STRING,
		},
		home_country: {
			type: S.STRING,
		},
		billing_street: {
			type: S.STRING,
		},
		billing_additional: {
			type: S.STRING,
		},
		billing_postalcode: {
			type: S.STRING,
		},
		billing_city: {
			type: S.STRING,
		},
		billing_country: {
			type: S.STRING,
		},
	});
};
