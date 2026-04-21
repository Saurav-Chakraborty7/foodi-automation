const loginActions = require("../pages/login/loginActions");
const auth = require("../utils/auth");
const loginLocators = require("../pages/login/loginLocators");
const { credentials, expectedMessages } = require("../../test-data/testData");

describe("Foodi's Login Test Suite", () => {
  afterEach(async () => {
    try {
      await loginActions.clickOnProfileIcon();
      await loginActions.clickOnLogOutButton();
    } catch (error) {
      // User is not logged in, skip logout
      console.log("Logout skipped - user not logged in");
    }
  });
  
  it("TC-001: Should login with valid credentials", async () => {
    await auth.loginAsValidUser(credentials.validUser.email, credentials.validUser.password);
  });

  it("TC-002: Should not login with invalid credentials", async () => {
    await auth.loginAsValidUser(credentials.invalidUser.email, credentials.invalidUser.password);
    await expect(loginLocators.invalidLoginMessage).toHaveText(
      expectedMessages.invalidLogin
    );
    await loginActions.clickOnCloseButton();
  });

  it("TC-003:Should not login with empty credentials", async () => {
    await auth.loginAsValidUser(credentials.emptyUser.email, credentials.emptyUser.password);
    await loginActions.clickOnSignInAfterCredrentials();
    await expect(loginLocators.emailValidationError).toHaveText(
      expectedMessages.emptyEmail
    );
    await loginActions.clickOnCloseButton();
  });

  it("TC-004: Checking if Password field is properly Masked", async () => {
    await loginActions.clickOnSignInWithEmailButton();
    const passwordField = await loginLocators.passwordInput;
    const fieldType = await passwordField.getAttribute("type");
    await expect(fieldType).toBe("password");
    await loginActions.clickOnCloseButton();
  });
});
