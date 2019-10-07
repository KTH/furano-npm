const fetch = require("node-fetch");

const DEFAULT_SERVICE_URL = "https://app.kth.se/jsonschema";

/**
 * Get the url to the validation service.
 * If the env FURANO_HOST is set, this value is used.
 */
const getServiceUrl = () => {
  return process.env.FURANO_HOST || DEFAULT_SERVICE_URL;
};

/**
 * Gets the full path pointing at the schema to validate against.
 * @param {*} schemaPath Path to the json schema relative the service url.
 * ex: "/my-app/schema/"
 * ex: "/flottsbro-api/deployment/"
 */
const getUrl = schemaPath => {
  if (schemaPath.startsWith("/")) {
    return getServiceUrl() + schemaPath;
  }
  return getServiceUrl() + "/" + schemaPath;
};

/**
 * Get a configuration for the POST to the Furano schema validation serivce.
 * @param {*} jsonToValidate The json to validate.
 */
const getPostData = jsonToValidate => {
  return {
    method: "POST",
    body: JSON.stringify(jsonToValidate),
    headers: { "Content-Type": "application/json" }
  };
};

/**
 * Gets a result json data strucure.
 * @param {*} valid Mark as valid json.
 * @param {*} validationError Any validation error, default to null.
 */
const result = (valid, validationError = null) => {
  let error = null;
  if (validationError) {
    error = JSON.stringify(validationError);
  }
  return {
    valid: valid,
    error: error
  };
};

/**
 * Validate json against a schema published under a path.
 * furano-npm.validate('app/schema', {'my': 'data'})
 * @param {*} schemaPath Path to the json schema relative the service url.
 * @param {*} jsonToValidate The json to validate.
 */
const validate = async (schemaPath, jsonToValidate) => {
  const post = await fetch(
    getUrl(schemaPath),
    getPostData(jsonToValidate)
  ).catch(err => {
    throw err;
  });

  const validationError = await post.json().catch(err => {
    throw err;
  });

  if (validationError && post.status !== 200) {
    return result(false, validationError);
  } else {
    return result(true);
  }
};

/**
 * Public exports
 */
module.exports = {
  validate: validate
};
