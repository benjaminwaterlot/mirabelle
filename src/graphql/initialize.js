const { gql } = require('apollo-server-express');

// These EMPTY schemas and resolvers are mandatory to "extend" the Query type
// and properly modularize schemas. They are not otherwise used.

const globalSchemas = [
	gql`
		directive @auth(
			requires: UserGroup! = GUEST
			personalAccess: Boolean! = false
		) on FIELD_DEFINITION

		enum UserGroup {
			GUEST
			CUSTOMER
			ADMIN
		}

		type Query {
			testQuery: String
		}

		type Mutation {
			testMutation: String
		}
	`,
];

const globalResolvers = {
	Query: {
		testQuery: () => null,
	},
	Mutation: {
		testMutation: () => null,
	},
};

export { globalSchemas, globalResolvers };
