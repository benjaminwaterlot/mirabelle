const S = require('sequelize');
import packCategories from './packCategories.json';

export default db => {
	return db.define('packs', {
		ref: {
			type: S.STRING,
			unique: true,
			allowNull: false,
		},
		pack_wiki_ref: {
			type: S.STRING,
			allowNull: false,
		},
		name: {
			type: S.STRING,
			allowNull: false,
		},
		pack_category: {
			type: S.ENUM(packCategories),
			allowNull: false,
		},
		price_ht: {
			type: S.DOUBLE,
			allowNull: true,
		},
		promo_price_ht: {
			type: S.DOUBLE,
			allowNull: true,
		},
		subscription_price_ht: {
			type: S.DOUBLE,
			allowNull: true,
		},
		nb_persons: {
			type: S.STRING,
			allowNull: true,
		},
		weight: {
			type: S.INTEGER,
			allowNull: true,
		},
	});
};
