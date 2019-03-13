import faker from '../database/faker';
import groupTypes from '../database/generic/groupTypes';
const _ = require('lodash');

export const insertCustomers = async ({ customers: Customer }) => {
	const fakeCustomers = [];
	for (const i of _.range(10)) {
		fakeCustomers[i] = Customer.create({
			surName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			groupType: faker.random.arrayElement(groupTypes),
			birthDate: Math.random() > 0.8 ? null : faker.date.past(),
		});
	}
	return await Promise.all(fakeCustomers);
};

export const setCustomerGroups = async (allCustomers, allGroups) => {
	const setGroups = [];
	for (const [index, customer] of allCustomers.entries()) {
		setGroups[index] = customer.setGroup(
			faker.random.arrayElement(allGroups),
		);
	}
	await Promise.all(setGroups);
};
