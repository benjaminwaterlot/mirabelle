import log from '../../helpers/log';

export default {
	Query: {
		user: async (obj, args, context) => {
			const mySelf = args.mySelf;

			if (mySelf) {
				const contextUserId = context.user.id;
				log.info(`USER RESOLVER FOUND THIS USER: ${contextUserId}`);
			}

			// TODO: IMPLEMENT SEARCHING FOR ANOTHER USER. (admin only)
			return context.user;
		},
	},
};
