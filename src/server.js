const express = require('express');

import middleware_cors from './middlewares/middleware_cors';
import middleware_jwt from './middlewares/middleware_jwt';
import middleware_jwt_invalid from './middlewares/middleware_jwt_invalid';

import apolloServer from './graphql/apolloServerConfig';
import DB from './data/initializeDb';
import log from './helpers/log';

const app = express();

// Allow CORS, but only from our front-end VueJS website.
app.use(middleware_cors);

// Parse and verify the accessToken (if any) in the request, coming from Auth0.
app.use(middleware_jwt);

// Allow invalid/expired tokens to still access public resources, like guests.
app.use(middleware_jwt_invalid);

// Create our back-end GraphQL server, and store in it user's roles and customerId.

// Launch the server

(async () => {
	log.info('✪ ENVIRONMENT IS : ', process.env.NODE_ENV);
	await DB.initializeDb();
	apolloServer.applyMiddleware({ app });

	app.listen({ port: process.env.PORT || 4000 }, () =>
		log.info('\n✪ Server ready ! 🚀'),
	);
})();

// Catch unhandled errors and log them, then restart NodeJS.
process.on('unhandledRejection', reason => {
	console.error(
		'\n\n\n🔥🔥🔥  ERROR: APP WILL STOP NOW.  🔥🔥🔥 \n\n\n',
		reason,
	);
	process.exit(1);
});
