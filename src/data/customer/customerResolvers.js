import log from '../../helpers/log';

export default {
	// User: {
	// 	cart_items: async (obj, args, context) => {
	// 		const models = context.db.models;
	// 		log.info(
	// 			`Request for cartItems received for ${context.user.customerId}`,
	// 		);
	// 		const user = context.user.userModel;
	// 		const cartItems = await user.getCartItems();
	// 		console.log(cartItems);
	// 		return cartItems;
	// 		// const currentCustomer = await models.customers.findOne({
	// 		// 	where: { id: customerId },
	// 		// });
	// 		// return models.cart_items.findAll({
	// 		// 	where: { customer_id: customerId },
	// 		// });
	// 	},
	// },
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
