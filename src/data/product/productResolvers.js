import log from '../../helpers/log';

export default {
	Query: {
		getCurrentProducts: async (obj, args, context) => {
			log.ok('RECEIVED QUERY FOR PRODUCTS');
			const products = context.db.models.products;

			const allProducts = await products.findAll({
				include: [
					{
						model: context.db.models.wiki_products,
						as: 'WikiProduct',
					},
				],
			});
			return allProducts;
		},
	},
};
