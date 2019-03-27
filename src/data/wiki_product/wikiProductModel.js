const S = require('sequelize');

export default db => {
	return db.define('wiki_products', {
		id: {
			type: S.STRING,
			primaryKey: true,
			// unique: true,
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
		},
		conservation_freezer: {
			type: S.STRING,
		},
		preparation: {
			type: S.TEXT,
		},
		nutrition: {
			type: S.TEXT,
		},
		supply_id: {
			type: S.STRING,
		},
		image: {
			type: S.STRING,
			allowNull: false,
		},
	});
};
