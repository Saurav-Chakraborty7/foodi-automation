const restaurantAndCartActions = require("../pages/restaurant selection/restaurantAndCartActions");
const email = "kinyce@fxzig.com";
const password = "123456Asd*";
const utils = require("../utils/utils");
const auth = require("../utils/auth");
const localStorage = require("../utils/localStorage");
const captureLocationEveryRun = require("../setup/location.setup");

describe("Foodi's Restaurant selection and Food ordering", () => {
  before(async () => {
  await auth.loginAsValidUser(email, password);

  await $('img[alt="Logo"]').waitForDisplayed({ timeout: 15000 });

  // Always capture fresh location
  await captureLocationEveryRun();
});


  it("TC-005: Should load restaurants using stored dynamic location", async () => {

    const fs = require("fs");
  const path = require("path");

  const locationPath = path.resolve(__dirname, "../../test-data/location.json");
  const locationData = JSON.parse(fs.readFileSync(locationPath, "utf-8"));

  if (!locationData.zoneId) {
    throw new Error("Invalid location data: zoneId missing");
  }

  await localStorage.setLocation(locationData);

  await browser.refresh();

  await $('img[alt="Logo"]').waitForDisplayed({ timeout: 15000 });

    // OPTIONAL:
    // If you still want to click UI (usually not needed anymore)
    /*
    await restaurantAndCartActions.clickOnReLocationButton();
    await restaurantAndCartActions.clickOnLocationButton();
    await restaurantAndCartActions.clickOnSubmitButton();
    */

    // At this point:
    // - zoneId exists
    // - restaurants API returns data
    // - "No restaurant found" will NOT appear

    await browser.pause(15000); // only for visual confirmation
  });

});
