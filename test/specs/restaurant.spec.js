const restaurantAndCartActions = require("../pages/restaurant selection/restaurantAndCartActions");
const email = "kinyce@fxzig.com";
const password = "123456Asd*";
const utils = require("../utils/utils");
const auth = require("../utils/auth");

describe("Foodi's Restaurant selection and Food ordering", () => {
  it("TC-005: Should be able to see the home page", async () => {
    await auth.loginAsValidUser(email, password);
    await restaurantAndCartActions.clickOnReLocationButton();
    await restaurantAndCartActions.clickOnLocationButton();
    await driver.pause(5000);
    await restaurantAndCartActions.clickOnSubmitButton();
    await driver.pause(5000);
  });
});
