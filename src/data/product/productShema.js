const { gql } = require('apollo-server-express');

export default gql`
	type Product {
		name: String!
		picture: String!
		origin: String!
		category: String!
		price_ht: Float!
		bio: Boolean!
	}

	extend type Query {
		getCurrentProducts: [Product!]!
	}
`;
