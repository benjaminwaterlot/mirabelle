const {
	SchemaDirectiveVisitor,
	AuthenticationError,
} = require('apollo-server');

const ROLES = ['GUEST', 'CUSTOMER', 'ADMIN'];

const isPersonalAccount = (personalAccess, root, user) => {
	const hasPersonalAccess =
		personalAccess && root.customerId === user.customerId;
	if (hasPersonalAccess)
		console.debug(`User access granted on his personal infos.`);
	return hasPersonalAccess;
};

const hasRequiredRole = (user, requires) => {
	const levelRequired = ROLES.indexOf(requires);

	if (levelRequired === -1) {
		throw new Error(`Role ${requires} not in roles ${ROLES.join(',')}`);
	}

	const maxUserRole = user.roles.reduce((maxRole, thisRole) => {
		return Math.max(ROLES.indexOf(thisRole), maxRole);
	}, -1);

	console.debug(
		`▻ User's roleLevel is ${maxUserRole} and ${levelRequired} is required.`,
	);

	return maxUserRole >= levelRequired;
};

export default class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { requires, personalAccess } = this.args;

		field.resolve = async function(root, args, context, info) {
			console.debug(`\n✪ Authorization started for ${info.fieldName}.`);
			const user = context.user;

			// User is not logged in (or have no role, which shouldn't happen).
			if (!user || !user.roles) {
				throw new AuthenticationError(
					'You must be signed in to view this resource.',
				);
			}

			// User is authorized, complete the query / mutation.
			else if (
				isPersonalAccount(personalAccess, root, user) ||
				hasRequiredRole(user, requires)
			) {
				console.debug(
					`▻ User with id ${user.customerId} [${
						user.roles
					}] has been granted access to ${info.fieldName}.`,
				);
				const result = await resolve.apply(this, args);
				return result;
			}

			// User has roles, but not the requested one.
			else {
				throw new AuthenticationError(
					`Not authorized: You should be at least ${requires}${
						personalAccess ? ' or be the concerned customer.' : ''
					}`,
				);
			}
		};
	}
}
