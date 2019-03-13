const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

export default jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://basilicetmirabelle.eu.auth0.com/.well-known/jwks.json`,
	}),
	audience: 'https://express_server/',
	issuer: `https://basilicetmirabelle.eu.auth0.com/`,
	algorithms: ['RS256'],
	credentialsRequired: false,
});
