export default {
	Query: {
		getCurrentProducts: async (obj, args, context) => {
			const products = context.db.models.products;

			const allProducts = await products.findAll({
				include: [
					{
						model: context.db.models.wiki_products,
					},
				],
			});
			return allProducts;
		},
	},
};
