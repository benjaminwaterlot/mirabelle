const { gql } = require('apollo-server-express');

export default gql`
	type Product {
		ref: String!
		name: String!
		picture: String!
		origin: String!
		category: String!
		price_ht: Float!
		bio: Boolean!
		wiki_product: WikiProduct!
	}

	extend type Query {
		getCurrentProducts: [Product!]!
	}
`;
