const test = require('tape');
var module = require('./index')

test('test url error', function (t) {
    t.plan(1)
    module.validate('///////?????', {})
        .catch(err => t.notEqual(err, null));
})

test('test failed validation', function (t) {
    t.plan(2);
    module.validate('dizin/deployment', {}).then(result => {
        t.false(result.valid);
        t.notEqual(result.error, null);
    });
});

test('test successful validation', function (t) {
    t.plan(2);
    module.validate('dizin/error', {
        message: "Test",
        slackChannels: null,
        stackTrace: null
    }).then(result => {
        t.true(result.valid);
        t.equal(result.error, null);
    });
});