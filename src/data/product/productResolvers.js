export default {
	Query: {
		getCurrentProducts: async (obj, args, context) => {
			const productsTable = context.db.models.products;

			const allProducts = await productsTable.findAll({});

			return allProducts;
		},
	},
};
