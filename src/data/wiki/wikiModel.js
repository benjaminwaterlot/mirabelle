const S = require('sequelize');

export default db => {
	return db.define('wikis', {
		ref: {
			type: S.STRING,
			unique: true,
			allowNull: false,
		},
		name: {
			type: S.STRING,
			allowNull: false,
		},
		description_short: {
			type: S.TEXT,
			allowNull: false,
		},
		description_long: {
			type: S.TEXT,
			allowNull: false,
		},
		fragility: {
			type: S.INTEGER,
			allowNull: false,
		},
		volume: {
			type: S.DOUBLE,
			allowNull: false,
		},
		conservation_fridge: {
			type: S.STRING,
			allowNull: true,
		},
		conservation_freezer: {
			type: S.STRING,
			allowNull: true,
		},
		preparation: {
			type: S.TEXT,
			allowNull: true,
		},
		nutrition: {
			type: S.TEXT,
			allowNull: true,
		},
		supply_ref: {
			type: S.STRING,
			allowNull: true,
		},
		image: {
			type: S.STRING,
			allowNull: false,
		},
	});
};
