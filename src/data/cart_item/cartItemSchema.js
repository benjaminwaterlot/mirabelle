const { gql } = require('apollo-server-express');

export default gql`
	type CartItem {
		product_id: String!
		user_id: String!
		getProduct: Product!
	}
	extend type Mutation {
		addCartItem(productRef: String!): [CartItem]!
	}
`;
