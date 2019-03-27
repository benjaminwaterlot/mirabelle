import faker from '../database/faker';
const _ = require('lodash');

export const insertWikis = async ({ wiki_products: Wiki }) => {
	const fakeWikis = [];
	for (const i of _.range(9)) {
		fakeWikis[i] = Wiki.create({
			id: faker.random.uuid(),
			description: faker.lorem.sentence(12),
			descriptionLong: faker.lorem.sentences(3),
			fragility: faker.random.number({ min: 1, max: 10, precision: 1 }),
			volume: faker.random.number({ min: 1, max: 2, precision: 0.01 }),
		});
	}
	return await Promise.all(fakeWikis);
};
