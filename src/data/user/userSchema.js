const { gql } = require('apollo-server-express');

export default gql`
	type User {
		id: String!
		customer_id: Int
		role: String
		email: String
		countCartItems: Int
		getCartItems: [CartItem]
	}
	extend type Query {
		user(userId: String, mySelf: Boolean): User!
	}
`;
