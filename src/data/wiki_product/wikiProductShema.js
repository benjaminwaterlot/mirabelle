const { gql } = require('apollo-server-express');

export default gql`
	type WikiProduct {
		description_short: String!
	}
`;
