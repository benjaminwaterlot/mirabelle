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
		getWikiProduct: WikiProduct!
		wiki_product_ref: String!
	}

	extend type Query {
		getCurrentProducts: [Product!]!
	}
`;
