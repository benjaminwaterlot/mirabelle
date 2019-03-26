const { gql } = require('apollo-server-express');

export default gql`
	type User {
		id: String!
		customer_id: Int!
		role: String!
		email: String!
		getCartItem: [CartItem]
	}
	extend type Query {
		user(userId: String): User!
	}
`;
