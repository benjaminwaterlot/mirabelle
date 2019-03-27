const Ajv = require('ajv');

const schema = {
	type: 'object',
	required: ['label', 'description_short', 'origin', 'id', 'price'],
	properties: {
		description_short: { type: 'string' },
		label: { type: 'string' },
		origin: { type: 'string' },
		price: {
			type: 'integer',
			minimum: 0,
			maximum: 100000,
			description:
				'The price of the product. Is an integer, expressed in cents.',
		},
		id: { type: 'string' },
	},
};

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

export default documentToValidate => {
	const validation = validate(documentToValidate);
	return { isValid: validation, message: ajv.errorsText(validate.errors) };
};
