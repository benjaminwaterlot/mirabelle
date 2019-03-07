const { ApolloServer } = require('apollo-server-express');
const _ = require('lodash');

import resolvers from './resolvers';
import schemas from './schemas';
import { globalResolvers, globalTypes } from './initialize';
import authDirective from './directives/auth';
import DB from '../database/dataSource';

const getContextFromRequest = async req => {
	const rawUser = req.user;

	// No user found by middleware_jwt.
	if (!rawUser) {
		return {
			roles: ['GUEST'],
			customerId: null,
		};
	}

	const roles = rawUser['https://basilicetmirabelle/roles'];
	const customerId = rawUser['https://basilicetmirabelle/customerId'];

	// User's infos are incomplete.
	if (!roles || !customerId) {
		return {
			roles: ['GUEST'],
			customerId: null,
		};
	}
	const user = { roles, customerId };
	console.debug(`▻ User recognized as :\n`, user);

	// User's infos are complete.
	return { user: user };
};

export default new ApolloServer({
	resolvers: _.merge(globalResolvers, resolvers),
	schemaDirectives: { auth: authDirective },
	typeDefs: [globalTypes, schemas],
	context: ({ req }) => {
		return getContextFromRequest(req);
	},
	dataSources: () => ({ DB: new DB() }),
});
