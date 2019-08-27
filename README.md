# furano-npm  ![alt text](https://api.travis-ci.org/KTH/furano-npm.svg?branch=master)

An npm package for usage with a json validation service. In KTHs case that's a project called furano.

## How to use

* Add `furano-npm` to your `package.json`

* Call using:

```js
const furano-npm = require('furano-npm')

furano-npm.validate('app/schema', {'my': 'data'})
    .then(result => console.log(`Validation was: ${result.valid} with optional error ${result.error}`))
    .catch(err => console.log(`Caught error: ${err}`));
```