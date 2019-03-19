const { ApolloServer } = require('apollo-server-express');
const _ = require('lodash');

import resolvers from './resolvers';
import schemas from './schemas';
import { globalResolvers, globalSchemas } from './initialize';
import authDirective from './directives/auth';
import DB from '../data/initialize';

const getContextFromRequest = async (req, DB) => {
	const rawUser = req.user;
	const defaultRole = ['GUEST'];
	const defaultId = null;

	// Retrieve from the JWT his roles and id.
	const roles = rawUser
		? rawUser['https://basilicetmirabelle/roles'] || defaultRole
		: defaultRole;
	const customerId = rawUser
		? rawUser['https://basilicetmirabelle/customerId'] || defaultId
		: defaultId;

	const user = { roles, customerId };
	console.debug(`▻ User recognized as :\n`, user);

	// User's infos are complete.
	return { user: user, db: DB };
};

export default new ApolloServer({
	resolvers: _.merge(globalResolvers, resolvers),
	schemaDirectives: { auth: authDirective },
	typeDefs: [...globalSchemas, ...schemas],
	context: ({ req }) => {
		return getContextFromRequest(req, DB.db);
	},
	// TODO : remove these lines before getting live.
	introspection: true,
	playground: true,
});
