const { gql } = require('apollo-server-express');

export default gql`
	type Customer {
		customer_id: Int!
		product_ref: String!
		cartItems: [CartItem]
	}
	# extend type Query {
	# 	cartItems: [CartItem]
	# }
`;
