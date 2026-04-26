const restaurantAndCartActions = require("../pages/restaurant and cart selection/restaurantAndCartActions");
const auth = require("../utils/auth");
const localStorage = require("../utils/localStorage");
const captureLocationEveryRun = require("../setup/location.setup");
const { credentials, timeouts } = require("../../test-data/testData");
const fs = require("fs");
const path = require("path");

describe("Foodi's Restaurant selection and Food ordering", () => {
  before(async () => {
    await auth.loginAsValidUser(credentials.validUser.email, credentials.validUser.password);

    await $('img[alt="Logo"]').waitForDisplayed({ timeout: timeouts.long });

    // Always capture fresh location
    await captureLocationEveryRun();
  });

  it("TC-005: Should load restaurants using stored dynamic location", async () => {
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

    await $('img[alt="Logo"]').waitForDisplayed({ timeout: timeouts.long });
  });

  it("TC-006: Randomly select restaurant", async () => {
    await restaurantAndCartActions.selectRandomRestaurant();
  });

  it("TC-007: Selecting random food item from restaurant and Add to cart", async () => {
    await restaurantAndCartActions.selectRandomFoodItem();
    await restaurantAndCartActions.clickAddToCartButton();
  });

  it("TC-008: Checkout and verify order", async () => {
    await restaurantAndCartActions.clickOnCheckoutButton();

    const subtotal = await restaurantAndCartActions.subtotalPrice();
    const delivery = await restaurantAndCartActions.deliveryfreePrice();
    const vat = await restaurantAndCartActions.vatPrice();
    const platform = await restaurantAndCartActions.platformfeePrice();
    const total = await restaurantAndCartActions.totalpayablePrice();

    // log values and types to help diagnose any string/number mixups
    console.log("Prices:", { subtotal, delivery, vat, platform, total });
    console.log(
      "Types:",
      typeof subtotal,
      typeof delivery,
      typeof vat,
      typeof platform,
      typeof total
    );

    // sanity check that all returned values are numeric
    expect(typeof subtotal).toBe("number");
    expect(typeof delivery).toBe("number");
    expect(typeof vat).toBe("number");
    expect(typeof platform).toBe("number");
    expect(typeof total).toBe("number");

    const expectedTotal = subtotal + delivery + vat + platform;

    expect(total).toBeCloseTo(expectedTotal, 0);
  });
});
