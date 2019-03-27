const { gql } = require('apollo-server-express');

export default gql`
	type Wiki {
		id: String
		name: String
		description_short: String
		description_long: String
	}
	extend type Query {
		getWikis: [Wiki]
		# getWikis: [Wiki] @auth(requires: ADMIN)
	}
	# type Pack {
	# 	label: String
	# 	description_short: String
	# 	image_src: String
	# 	origin: String
	# 	price: Int
	# }
	# extend type Query {
	# 	getPacks: [Pack] @auth(requires: ADMIN)
	# }
`;
