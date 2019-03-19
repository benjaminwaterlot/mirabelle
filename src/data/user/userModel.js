const S = require('sequelize');
import userRoles from './userRoles';

// On account creation, the user is simply asked his email address and a password.
// He's then redirected to our website, where a few more infos are asked :
// customer informations (address, etc) => his 'customer' line in POSTGRES is then created with groupType 'HOME'
// phone number => his 'user' line in POSTGRES is then created with role CUSTOMER.
export default db => {
	return db.define('users', {
		user_id: {
			type: S.UUID,
			allowNull: false,
		},
		customer_id: {
			type: S.INTEGER,
			allowNull: false,
		},
		role: {
			type: S.ENUM(userRoles),
			allowNull: false,
		},
		surName: {
			type: S.STRING,
			allowNull: false,
		},
		lastName: {
			type: S.STRING,
			allowNull: false,
		},
		email: {
			type: S.STRING,
			allowNull: false,
		},
		phone: {
			type: S.STRING,
			allowNull: false,
		},
	});
};
