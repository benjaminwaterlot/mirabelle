const { ApolloServer } = require('apollo-server-express');
const _ = require('lodash');
import log from '../helpers/log';

import resolvers from './resolvers';
import schemas from './schemas';
import authDirective from './directives/auth';
import DB from '../data/initializeDb';

const getContextFromRequest = async (req, DB) => {
	const rawUser = req.user;

	// TODO: REMOVE THIS LINE, USED TO TEST IN PLAYGROUND ONLY !
	if (!rawUser)
		return {
			user: {
				roles: ['GUEST', 'ADMIN'],
				customerId: 1,
				userModel: await DB.models.users.findOne({}),
			},
			db: DB,
		};

	const defaultRole = ['GUEST'];

	// Retrieve from the JWT his roles and id.
	const roles = rawUser
		? rawUser['https://basilicetmirabelle/roles'] || defaultRole
		: defaultRole;

	const customerId = rawUser
		? rawUser['https://basilicetmirabelle/customerId'] || defaultId
		: null;

	const userId =
		rawUser && rawUser.sub && rawUser.sub.length > 6
			? rawUser.sub.slice(6)
			: null;

	const userModel = userId
		? await DB.models.users.findOne({
				where: { id: userId },
		  })
		: null;

	const user = { roles, customerId, userModel };
	log.ok(`▻ User recognized as :\n`, user);

	// User's infos are complete and returned in the context with the DB.
	return { user: user, db: DB };
};

export default new ApolloServer({
	resolvers,
	schemaDirectives: { auth: authDirective },
	typeDefs: schemas,
	context: ({ req }) => {
		return getContextFromRequest(req, DB.db);
	},

	// TODO : remove these lines before getting live !
	introspection: true,
	playground: true,
});
