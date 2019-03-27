import faker from '../database/faker';
import productCategories from '../database/generic/productCategories';
import productQuantifiers from '../database/generic/productQuantifiers';
const _ = require('lodash');

export const insertProducts = async ({ products: Product }) => {
	const fakeProducts = [];
	for (const i of _.range(10)) {
		fakeProducts[i] = Product.create({
			id: faker.random.uuid(),
			name: faker.random.word(),
			picture: faker.random.alphaNumeric(5) + '.jpg',
			origin: faker.address.country(),
			category: faker.random.arrayElement(productCategories),
			priceHt: faker.random.number({ min: 2, max: 20, precision: 0.01 }),
			minQuantity: faker.random.arrayElement([1, 3]),
			quantifier: faker.random.arrayElement(productQuantifiers),
			weight: faker.random.number({ min: 1, max: 1.5, precision: 0.1 }),
			isBio: true,
			isLocal: Math.random() > 0.8 ? true : false,
			supplyPrice: faker.random.number({
				min: 1,
				max: 10,
				precision: 0.01,
			}),
			supplyQuantifier: faker.random.arrayElement(productQuantifiers),
			manufacturingQuantifier: faker.random.arrayElement(
				productQuantifiers,
			),
			manufacturingSupplier:
				Math.random() > 0.5 ? faker.company.companyName() : null,
			manufacturingProcess: 'BIO',
			manufacturingLettring: 1,
		});
	}
	return await Promise.all(fakeProducts);
};

export const setProductWikis = async (allProducts, allWikis) => {
	const setWikis = [];
	for (const [index, Product] of allProducts.entries()) {
		setWikis[index] = Product.setWiki(faker.random.arrayElement(allWikis));
	}
	await Promise.all(setWikis);
};
