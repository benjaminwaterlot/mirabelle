import faker from '../database/faker';
import groupTypes from '../database/generic/groupTypes';
const _ = require('lodash');

export const insertGroups = async ({ groups: Group }) => {
	const fakeGroups = [];
	for (const i of _.range(4)) {
		fakeGroups[i] = Group.create({
			groupType: faker.random.arrayElement(groupTypes),
		});
	}
	return await Promise.all(fakeGroups);
};
