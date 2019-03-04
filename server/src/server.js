const _ = require('lodash');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

import resolvers from './graphql/resolvers';
import schemas from './graphql/schemas';
import { globalResolvers, globalTypes } from './graphql/initialize';

import { connectToMongo } from './mongodb/mongoSetup';
import testSchemas from './tests/testSchemas';
import createCollections from './mongodb/initialize/createCollections';

import middleware_cors from './middlewares/middleware_cors';
import middleware_jwt from './middlewares/middleware_jwt';
import middleware_jwt_invalid from './middlewares/middleware_jwt_invalid';

import authDirective from './graphql/directives/auth';

const app = express();

// Allow CORS, but only from our front-end VueJS website.
app.use(middleware_cors);

// Parse and verify the accessToken (if any) in the request, coming from Auth0.
app.use(middleware_jwt);

// Allow invalid/expired tokens to still access public resources, like guests.
app.use(middleware_jwt_invalid);

// Create our back-end GraphQL server, and save user's roles and customerId.
const graphQLServer = new ApolloServer({
	resolvers: _.merge(globalResolvers, resolvers),
	schemaDirectives: { auth: authDirective },
	typeDefs: [globalTypes, schemas],
	context: ({ req }) => {
		const rawUser = req.user;
		if (!rawUser) return null;

		const roles = rawUser['https://basilicetmirabelle/status'];
		const customerId = rawUser['https://basilicetmirabelle/customerId'];
		const user = { roles, customerId };

		console.info(`USER STATUS IS `, user);

		return { user };
	},
});

graphQLServer.applyMiddleware({ app });

// Setup and launch Express
(async () => {
	console.debug('\n✪ Connecting to MongoDB...');
	await connectToMongo();
	console.debug('\n✪ Initializing collections...');
	await createCollections();
	console.debug('\n✪ Testing schemas with raw data...');
	await testSchemas();
	console.debug('\n✪ Launching server...');
	app.listen({ port: 4000 }, () => console.log('\n✪ Server ready ! 🚀'));
})();

process.on('unhandledRejection', reason => {
	console.error('Unhandled promise rejection:', reason);
	process.exit(1);
});
