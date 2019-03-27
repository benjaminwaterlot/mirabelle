import DB from '../../data/initializeDb';

export default async (guestUserId = 'playground_tester') => {
	const db = DB.db;
	const userTable = db.models.users;

	const guestFoundOrCreated = await userTable.findOrCreate({
		where: { id: guestUserId },
		defaults: {
			customer_id: null,
			role: 'GUEST',
			email: null,
			phone: null,
		},
	});
	return guestFoundOrCreated[0];
};
