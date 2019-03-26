const { gql } = require('apollo-server-express');

export default gql`
	type CartItem {
		product_ref: String!
		user_id: String!
	}
`;
