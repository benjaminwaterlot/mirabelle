const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
import schema from '../schemas/customers';

export default documentToValidate => {
	const validation = ajv.validate(schema, documentToValidate);
	return { isValid: validation, message: ajv.errorsText(validation.errors) };
};
