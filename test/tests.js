const test = require("tape");
var module = require("../index");

test("When a bad schema path is passed, an error should be returned.", function(t) {
  t.plan(1);
  module
    .validate("///////?????", {})
    .catch(err =>
      t.notEqual(err, null, "An error message was found in the return object.")
    );
});

test("When a json is unvalid, mark as unvalid and add an error message.", function(t) {
  t.plan(2);
  const jsonToValidate = {};
  module.validate("dizin/deployment", jsonToValidate).then(result => {
    t.false(result.valid, "Marked as invalid.");
    t.notEqual(
      result.error,
      null,
      "An error message was found in the return object."
    );
  });
});

test("When a json is valid, mark as valid and set error message to 'null'", function(t) {
  t.plan(2);
  const jsonToValidate = {
    message: "Test",
    slackChannels: null,
    stackTrace: null
  };
  module.validate("dizin/error", jsonToValidate).then(result => {
    t.true(result.valid, "Marked as valid");
    t.equal(
      result.error,
      null,
      "No error message was found in the return object."
    );
  });
});
