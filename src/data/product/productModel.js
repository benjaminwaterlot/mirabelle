const S = require('sequelize');

import productCategories from '../generic/productCategories';
import productQuantifiers from '../generic/productQuantifiers';

export default db => {
	return db.define('products', {
		ref: {
			type: S.STRING,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		name: {
			type: S.STRING,
			allowNull: false,
		},
		picture: {
			type: S.STRING,
			allowNull: false,
		},
		origin: {
			type: S.STRING,
		},
		category: {
			type: S.ENUM(productCategories),
			allowNull: false,
		},
		price_ht: {
			type: S.DOUBLE,
		},
		promo_price_ht: {
			type: S.DOUBLE,
		},
		min_quantity: {
			type: S.INTEGER,
			defaultValue: 1,
		},
		quantifier: {
			type: S.ENUM(productQuantifiers),
			allowNull: false,
		},
		weight: {
			type: S.DOUBLE,
			allowNull: false,
		},
		bio: {
			type: S.BOOLEAN,
			defaultValue: true,
		},
		local: {
			type: S.BOOLEAN,
			defaultValue: false,
		},
		conv: {
			type: S.BOOLEAN,
			defaultValue: false,
		},
		demeter: {
			type: S.BOOLEAN,
			defaultValue: false,
		},
		fairtrade: {
			type: S.BOOLEAN,
			defaultValue: false,
		},
		supply_price: {
			type: S.DOUBLE,
			allowNull: false,
		},
		supply_quantifier: {
			type: S.ENUM(productQuantifiers),
			allowNull: false,
		},
		manufacturing_quantifier: {
			type: S.ENUM(productQuantifiers),
		},
		manufacturing_supplier: {
			type: S.STRING,
		},
		manufacturing_process: {
			type: S.STRING,
		},
		manufacturing_lettring: {
			type: S.STRING,
		},
		group_whitelist: {
			type: S.ARRAY(S.INTEGER),
		},
		group_blacklist: {
			type: S.ARRAY(S.INTEGER),
		},
		certification: {
			type: S.BOOLEAN,
		},
		// TODO: LINK THE PRODUCT WITH HIS WIKI ID.
	});
};
