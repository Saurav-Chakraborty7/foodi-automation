const loginActions = require("../pages/login/loginActions");
const utils = require("../utils/utils");
const auth = require("../utils/auth");
const loginLocators = require("../pages/login/loginLocators");
const restaurantAndCartActions = require("../pages/restaurant selection/restaurantAndCartActions");
const email = "kinyce@fxzig.com";
const password = "123456Asd*";

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
    await auth.loginAsValidUser(email, password);
  });

  it("TC-002: Should not login with invalid credentials", async () => {
    await auth.loginAsValidUser(email, password+"wrong");
    await expect($("//p[@class='fd-text-primary-600']")).toHaveText(
      "Sorry! Invalid email or password!"
    );
    await loginActions.clickOnCloseButton();
  });

  it("TC-003:Should not login with empty credentials", async () => {
    await auth.loginAsValidUser(" "," ");
    await loginActions.clickOnSignInAfterCredrentials();
    await expect($("//small[@class='p-error']")).toHaveText(
      "Email is a required field"
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
