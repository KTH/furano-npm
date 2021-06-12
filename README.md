# furano-npm ![alt text](https://api.travis-ci.org/KTH/furano-npm.svg?branch=master) ![Continous Integration](https://github.com/KTH/furano-npm/actions/workflows/main.yml/badge.svg)

An npm package for usage with a json validation service. In KTHs case that's a project called furano.

## How to use

- Add `furano-npm` to your `package.json`

- Call using:

```javascript
const furano-npm = require('furano-npm')

furano-npm.validate('app/schema', {'my': 'data'})
    .then(result => console.log(`Validation was: ${result.valid} with optional error ${result.error}`))
    .catch(err => console.log(`Caught error: ${err}`));
```

```text

  When a bad schema path is passed, an error should be returned.

    ✔ An error message was found in the return object.

  When a json is unvalid, mark as unvalid and add an error message.

    ✔ Marked as invalid.
    ✔ An error message was found in the return object.

  When a json is valid, mark as valid and set error message to 'null'

    ✔ Marked as valid
    ✔ No error message is added.
```
