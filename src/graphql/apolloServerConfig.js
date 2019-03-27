const { ApolloServer } = require('apollo-server-express');
const _ = require('lodash');
import log from '../helpers/log';

import resolvers from './resolvers';
import schemas from './schemas';
import authDirective from './directives/auth';
import DB from '../data/initializeDb';
import createGuestUser from '../data/user/createGuestUser';

const getContextFromRequest = async (req, DB) => {
	const rawUser = req.user;

	//
	// TODO: REMOVE THIS BLOCK, USED TO TEST IN PLAYGROUND ONLY !
	// if (!rawUser) {
	// 	log.error(`NO USER FOUND. ENSURE THIS IS A PLAYGROUND TEST`);
	// 	return {
	// 		user: {
	// 			roles: ['GUEST', 'ADMIN'],
	// 			customerId: 1,
	// 			userModel: await DB.models.users.findOne({}),
	// 		},
	// 		db: DB,
	// 	};
	// }
	// TODO: REMOVE THIS BLOCK, USED TO TEST IN PLAYGROUND ONLY !
	//

	if (!rawUser) {
		log.info(
			`We will find or create the user ${
				req.headers['x-identification']
			}`,
		);
		return {
			user: await createGuestUser(req.headers['x-identification']),
			db: DB,
		};
	}

	const defaultRole = ['GUEST'];

	console.log(rawUser);

	// Retrieve from the JWT his roles and id.
	const customerId = rawUser
		? rawUser['https://basilicetmirabelle/customerId'] || defaultId
		: null;

	// If the user is a guest, create his row in users table and return it.
	const roles = rawUser
		? rawUser['https://basilicetmirabelle/roles'] || defaultRole
		: defaultRole;

	const userId =
		rawUser && rawUser.sub && rawUser.sub.length > 6
			? rawUser.sub.slice(6)
			: null;

	const userModel = userId
		? await DB.models.users.findOne({
				where: { id: userId },
		  })
		: null;

	// const user = { roles, customerId, userModel };
	log.ok(`▻ User recognized as :\n`, userModel);

	// User's infos are complete and returned in the context with the DB.
	return { user: userModel, db: DB };
};

export default new ApolloServer({
	resolvers,
	schemaDirectives: { auth: authDirective },
	typeDefs: schemas,
	context: ({ req }) => {
		// console.log(`THIS IS REQ.USER`, req.user);
		// for (const prop in req) console.log(prop);
		// console.log('cookies ', req.cookies, req.cookie);
		return getContextFromRequest(req, DB.db);
	},
	formatResponse: response => {
		console.log(response);
		return response;
	},

	// TODO : remove these lines before getting live !
	introspection: true,
	playground: true,
});
