export default {
	Query: {
		getCurrentProducts: async (obj, args, context) => {
			console.log('TESTING');
			const products = context.db.models.products;

			const allProducts = await products.findAll({
				include: [
					{
						model: context.db.models.wiki_products,
					},
				],
			});
			console.log(allProducts);

			// return [1, 2];
			return allProducts;
		},
	},
};
