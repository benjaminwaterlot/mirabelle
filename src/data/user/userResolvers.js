import log from '../../helpers/log';

export default {
	Query: {
		user: async (obj, args, context) => {
			const contextUserId = context.user.userModel.id;

			// TODO : Remove this to secure the access or add auth directive.
			// const userId = args.userId ? args.userId : contextUserId
			return context.user.userModel;
		},
	},
	User: {
		cart_items: async (obj, args, context) => {
			const models = context.db.models;
			log.info(
				`Request for cartItems received for ${context.user.customerId}`,
			);
			const user = context.user.userModel;

			const cartItems = await user.getCartItem();
			console.log(cartItems);
			return cartItems;
		},
	},
};
