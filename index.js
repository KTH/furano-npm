var fetch = require('node-fetch')

async function _validate(schemaPath, jsonToValidate) {
    const defaultHost = 'https://app.kth.se/jsonschema'
    const furanoHost = process.env.FURANO_HOST || defaultHost;
    if (!schemaPath.startsWith('/')) schemaPath = '/' + schemaPath;
    const validationUrl = furanoHost + schemaPath;
    var response = await fetch(validationUrl, {
        method: 'POST',
        body: JSON.stringify(jsonToValidate),
        headers: { 'Content-Type': 'application/json' }
    }).catch(err => { throw err });
    var jsonBody = await response.json()
        .catch(err => { throw err });
    if (jsonBody && response.status !== 200) {
        return { valid: false, error: JSON.stringify(jsonBody) }
    } else {
        return { valid: true, error: null }
    }
}

exports.validate = _validate;