export default {
	Customer: {
		cartItems: async (obj, args, context) => {
			const customerId = args.customerId;

			// TODO : REMOVE THIS, FOR TESTING ONLY
			if (!customerId) customerId = 1;

			const models = context.db.models;
			const currentCustomer = await models.customers.findOne({
				where: { id: customerId },
			});
			console.log(currentCustomer);
			return models.cart_items.findAll({
				where: { customer_id: customerId },
			});
		},
	},
	// Mutation: {
	// addItem: async (obj, args, context) => {
	// 	const user = context.user;
	// 	const models = context.db.models;
	// 	const currentCustomer = models.customers.findOne({
	// 		where: { id: user.customerId },
	// 	});
	// 	console.log(currentCustomer);
	// 	return context.db.models.cart_items.findAll({
	// 		where: { customer_id: user.customerId },
	// 	});
	// },
	// },
};
