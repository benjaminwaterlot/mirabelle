const _ = require('lodash');

import packResolvers from '../data/pack/packResolvers';
import newsletterResolvers from '../data/newsletter/newsletterResolvers';
import productResolvers from '../data/product/productResolvers';
import cartItemResolvers from '../data/cart_item/cartItemResolvers';
import customerResolvers from '../data/customer/customerResolvers';

const resolvers = _.merge({
	...packResolvers,
	...newsletterResolvers,
	...productResolvers,
	...cartItemResolvers,
	...customerResolvers,
});
export default resolvers;
