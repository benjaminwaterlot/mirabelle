export default {
	Mutation: {
		addCartItem: async (obj, args, context) => {
			const { productRef } = args;
			const { user, db } = context;
			const { cart_items } = db.models;

			const product = await db.models.products.findOne({
				where: { id: productRef },
			});
			if (!product)
				throw new Error(
					`The product <${productRef}> doesnt exist in the database.`,
				);
			const newCartItem = await cart_items.create({
				product_id: product.id,
			});
			const add = await user.addCartItem(newCartItem);
			const newCart = await user.getCartItems();
			return newCart;
		},
	},
};
