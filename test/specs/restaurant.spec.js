const restaurantAndCartActions = require("../pages/restaurant and cart selection/restaurantAndCartActions");
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

    const locationPath = path.resolve(
      __dirname,
      "../../test-data/location.json",
    );
    const locationData = JSON.parse(fs.readFileSync(locationPath, "utf-8"));

    if (!locationData.zoneId) {
      throw new Error("Invalid location data: zoneId missing");
    }

    await localStorage.setLocation(locationData);

    await browser.refresh();

    await $('img[alt="Logo"]').waitForDisplayed({ timeout: 15000 });
    await browser.pause(10000);
  });

  it("TC-006: Randomly select restaurant", async () => {
    await restaurantAndCartActions.selectRandomRestaurant();
    await browser.pause(5000);
  });

  it("TC-007: Selecting random food item from restaurant and Add to cart", async () => {
    await restaurantAndCartActions.selectRandomFoodItem();
    await restaurantAndCartActions.clickAddToCartButton();
    await browser.pause(10000);
  });

  it("TC-008: Checkout and verify order", async () => {
    await restaurantAndCartActions.clickOnCheckoutButton();

    const subtotal = await restaurantAndCartActions.subtotalPrice();
    const delivery = await restaurantAndCartActions.deliveryfreePrice();
    const vat = await restaurantAndCartActions.vatPrice();
    const platform = await restaurantAndCartActions.platformfeePrice();
    const total = await restaurantAndCartActions.totalpayablePrice();

    const expectedTotal = subtotal + delivery + vat + platform;

    expect(total).toEqual(expectedTotal);
  });
});
