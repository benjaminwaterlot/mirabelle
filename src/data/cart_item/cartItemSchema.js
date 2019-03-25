const { gql } = require('apollo-server-express');

export default gql`
	type CartItem {
		customer_id: Int!
		product_ref: String!
	}
`;
