import faker from '../data/faker';
import groupTypes from '../database/generic/groupTypes';
const _ = require('lodash');

export const insertCustomers = async ({ customers: Customer }) => {
	const fakeCustomers = [];
	for (const i of _.range(10)) {
		fakeCustomers[i] = Customer.create({
			surname: faker.name.firstName(),
			lastname: faker.name.lastName(),
			group_type: faker.random.arrayElement(groupTypes),
			birthdate: Math.random() > 0.8 ? null : faker.date.past(),
			landline_phone:
				Math.random() > 0.3 ? null : faker.phone.phoneNumber(),
			mobile_phone: faker.phone.phoneNumber(),
			email: faker.internet.email(),
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
