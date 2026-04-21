/**
 * Centralized test data for the Foodi automation suite.
 * Keep all credentials, URLs, timeouts, and expected messages here
 * so spec files stay clean and changes only happen in one place.
 */

const credentials = {
  validUser: {
    email: "kinyce@fxzig.com",
    password: "123456Asd*",
  },
  invalidUser: {
    email: "kinyce@fxzig.com",
    password: "123456Asd*wrong",
  },
  emptyUser: {
    email: " ",
    password: " ",
  },
};

const expectedMessages = {
  invalidLogin: "Sorry! Invalid email or password!",
  emptyEmail: "Email is a required field",
};

const timeouts = {
  default: 10000,
  long: 15000,
  extraLong: 20000,
};

module.exports = { credentials, expectedMessages, timeouts };
