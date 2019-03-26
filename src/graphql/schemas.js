import packSchemas from '../data/pack/packSchema';
import newsletterSchema from '../data/newsletter/newsletterSchema';
import productShema from '../data/product/productShema';
import wikiProductShema from '../data/wiki_product/wikiProductShema';
import cartItemSchema from '../data/cart_item/cartItemSchema';
import customerSchema from '../data/customer/customerSchema';
import userSchema from '../data/user/userSchema';
import { globalSchemas } from './initialize';

export default [
	globalSchemas,
	packSchemas,
	newsletterSchema,
	productShema,
	wikiProductShema,
	cartItemSchema,
	customerSchema,
	userSchema,
];
