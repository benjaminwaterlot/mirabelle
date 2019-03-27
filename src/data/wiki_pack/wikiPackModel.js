const S = require('sequelize');

export default db => {
	return db.define('wiki_packs', {
		id: {
			type: S.STRING,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: S.STRING,
			allowNull: false,
		},
		description_short: {
			type: S.STRING,
			allowNull: false,
		},
		description_long: {
			type: S.STRING,
		},
		image: {
			type: S.STRING,
			allowNull: false,
		},
		bio: {
			type: S.BOOLEAN,
			allowNull: false,
		},
		origin: {
			type: S.STRING,
			allowNull: false,
		},
		manufacturing_unit: {
			type: S.STRING,
			allowNull: false,
		},
		manufacturing_supplier: {
			type: S.STRING,
			allowNull: false,
		},
		manufacturing_process: {
			type: S.STRING,
			allowNull: false,
		},
		certification: {
			type: S.BOOLEAN,
			allowNull: false,
		},
	});
};
