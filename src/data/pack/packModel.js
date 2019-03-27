const S = require('sequelize');
import packCategories from './packCategories.json';

export default db => {
	return db.define('packs', {
		id: {
			type: S.STRING,
			allowNull: false,
			primaryKey: true,
		},
		wiki_pack_id: {
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
		},
		promo_price_ht: {
			type: S.DOUBLE,
		},
		subscription_price_ht: {
			type: S.DOUBLE,
		},
		nb_persons: {
			type: S.STRING,
		},
		weight: {
			type: S.INTEGER,
		},
	});
};
