// We don't want to block expired tokens, because some resources are public
// and should be displayed anyway. Authorization comes later, in GraphQL.

export default (err, req, res, next) => {
	if (err.code === 'invalid_token') return next();
	return next(err, req);
};
