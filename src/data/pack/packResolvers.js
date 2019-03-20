export default {
	Query: {
		getWikis: async (obj, args, context) => {
			// console.log(context.db);
			return context.db.models.wiki_products.findAll({});
		},
	},
};
