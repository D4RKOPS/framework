const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

function validateSchema(schema, data) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  return { valid, errors: validate.errors || [] };
}

module.exports = { validateSchema };
