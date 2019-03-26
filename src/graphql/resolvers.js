const _ = require('lodash');

import packResolvers from '../data/pack/packResolvers';
import newsletterResolvers from '../data/newsletter/newsletterResolvers';
import productResolvers from '../data/product/productResolvers';
import cartItemResolvers from '../data/cart_item/cartItemResolvers';
import customerResolvers from '../data/customer/customerResolvers';
import userResolvers from '../data/user/userResolvers';
import { globalResolvers } from './initialize';

console.log(userResolvers);
console.log(productResolvers);
console.log('\n');

const resolvers = [
	globalResolvers,
	userResolvers,
	packResolvers,
	newsletterResolvers,
	cartItemResolvers,
	customerResolvers,
	productResolvers,
].reduce((source, other) => _.merge(source, other), {});

console.log(resolvers);
export default resolvers;
