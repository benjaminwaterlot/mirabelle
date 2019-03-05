const express = require('express');

import middleware_cors from './middlewares/middleware_cors';
import middleware_jwt from './middlewares/middleware_jwt';
import middleware_jwt_invalid from './middlewares/middleware_jwt_invalid';

import apolloServer from './graphql/apolloServerConfig';
import initializeDB from './database/initialize';

const app = express();

// Allow CORS, but only from our front-end VueJS website.
app.use(middleware_cors);

// Parse and verify the accessToken (if any) in the request, coming from Auth0.
app.use(middleware_jwt);

// Allow invalid/expired tokens to still access public resources, like guests.
app.use(middleware_jwt_invalid);

// Create our back-end GraphQL server, and store in it user's roles and customerId.
apolloServer.applyMiddleware({ app });

// Launch the server
(async () => {
	console.log('✪ Connection has been established successfully.');

	const db = await initializeDB();

	app.listen({ port: 4000 }, () => console.debug('\n✪ Server ready ! 🚀'));
})();

process.on('unhandledRejection', reason => {
	console.error(
		'\n\n\n🔥🔥🔥   ERROR: APP WILL STOP NOW.  🔥🔥🔥 \n\n\n',
		reason,
	);
	process.exit(1);
});
