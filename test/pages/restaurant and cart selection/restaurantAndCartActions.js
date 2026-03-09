const restaurantAndCartLocators = require("./restaurantAndCartLocators");
class RestaurantAndCartActions {
  async clickOnLocationButton() {
    await restaurantAndCartLocators.locationInput.waitForDisplayed({
      timeout: 10000,
    });
    await restaurantAndCartLocators.locationInput.click();
  }

  async clickOnReLocationButton() {
    await restaurantAndCartLocators.reLocationInput.waitForDisplayed({
      timeout: 10000,
    });
    await restaurantAndCartLocators.reLocationInput.click();
  }

  async clickOnSubmitButton() {
    await restaurantAndCartLocators.submitButtton.waitForDisplayed({
      timeout: 10000,
    });
    await restaurantAndCartLocators.submitButtton.click();
  }

  async clickOnFoodiLogo() {
    await restaurantAndCartLocators.foodiLogo.waitForDisplayed({
      timeout: 10000,
    });
    await restaurantAndCartLocators.foodiLogo.click();
  }

  async selectRandomRestaurant() {
    // grab all restaurants and filter out any that are not currently displayed
    let restaurants = await restaurantAndCartLocators.allRestaurants;
    const visible = [];
    for (const r of restaurants) {
      if (await r.isDisplayed()) {
        visible.push(r);
      }
    }
    const count = visible.length;
    if (count === 0) {
      throw new Error("No restaurants found for this location");
    }

    // attempt to click one of the visible restaurants; retry if something goes wrong
    const maxRetries = 5;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const randomIndex = Math.floor(Math.random() * count);
      const restaurant = visible[randomIndex];
      console.log(
        `🚀 [attempt ${attempt}] Selecting restaurant index: ${randomIndex + 1} / ${count}`
      );
      try {
        await restaurant.scrollIntoView({ block: "center" });
        await restaurant.waitForClickable({ timeout: 15000 });
        await restaurant.click();
        // successful click, exit early
        return;
      } catch (err) {
        console.warn(
          `⚠️ click failed on restaurant index ${randomIndex + 1}: ${err.message}`
        );
        // on last attempt, rethrow to surface the failure
        if (attempt === maxRetries) {
          throw new Error(
            "Unable to select a restaurant after multiple retries"
          );
        }
        // short pause before retrying
        await browser.pause(1000);
      }
    }
  }

  async selectRandomFoodItem() {
    // sometimes the page hasn't finished loading; filter visible ones
    let foodItems = await restaurantAndCartLocators.allFoodItems;
    const visible = [];
    for (const f of foodItems) {
      if (await f.isDisplayed()) {
        visible.push(f);
      }
    }
    const count = visible.length;
    if (count === 0) {
      throw new Error("No Food Items found for this restaurant");
    }

    const randomIndex = Math.floor(Math.random() * count);
    console.log(`🚀 Selecting food item index: ${randomIndex + 1} / ${count}`);
    const item = visible[randomIndex];
    await item.scrollIntoView({ block: "center" });
    await item.waitForClickable({ timeout: 15000 });
    await item.click();
  }

  async clickAddToCartButton() {
    await restaurantAndCartLocators.addToCartButton.waitForDisplayed({
      timeout: 10000,
    });
    await restaurantAndCartLocators.addToCartButton.click();

    // after clicking, ensure the checkout button shows up (cart updated)
    try {
      await browser.waitUntil(
        async () => await restaurantAndCartLocators.checkoutButton.isDisplayed(),
        {
          timeout: 20000,
          interval: 500,
          timeoutMsg: "checkout button did not appear after adding item",
        }
      );
    } catch (err) {
      console.warn("⚠️ cart might not have updated: ", err.message);
    }
  }
  async clickOnCheckoutButton() {
    // sometimes the button is slow to appear or partially covered; retry a few times
    const maxAttempts = 3;
    for (let i = 1; i <= maxAttempts; i++) {
      try {
        await restaurantAndCartLocators.checkoutButton.waitForDisplayed({
          timeout: 15000,
        });
        await restaurantAndCartLocators.checkoutButton.scrollIntoView({ block: "center" });
        await restaurantAndCartLocators.checkoutButton.waitForClickable({ timeout: 10000 });
        await restaurantAndCartLocators.checkoutButton.click();
        return;
      } catch (err) {
        console.warn(`⚠️ checkout click attempt ${i} failed: ${err.message}`);
        if (i === maxAttempts) {
          throw err;
        }
        // maybe the cart hasn't finished animating; pause then try again
        await browser.pause(1000);
      }
    }
  }
  // helper
  parsePrice(text) {
    if (!text) return 0;

    const value = parseFloat(text.replace(/[^\d.]/g, ""));
    console.log("🚀 ~ RestaurantAndCartActions ~ parsePrice ~ value:", value)
    return isNaN(value) ? 0 : value;
  }

  // Actions
  // internal helper that attempts to pull a numeric value from an element
  async _getPriceFromElement(el) {
    // wait until the element's text contains a digit (price may load asynchronously)
    try {
      await browser.waitUntil(
        async () => /\d/.test(await el.getText()),
        {
          timeout: 15000,
          timeoutMsg: "price text did not contain a digit",
        }
      );
    } catch (_) {
      // element text didn't gain digits; we will look elsewhere before warning
    }

    let text = await el.getText();
    console.log("🚀 ~ RestaurantAndCartActions ~ _getPriceFromElement initial text:", text);

    // if the element itself still has no digits, look through descendants and siblings
    if (!/\d/.test(text)) {
      // collect any descendant whose text contains digits
      const descendants = await el.$$("*");
      for (const d of descendants) {
        const t = await d.getText();
        if (/\d/.test(t)) {
          text = t;
          console.log(
            "🚀 ~ RestaurantAndCartActions ~ _getPriceFromElement found in descendant:",
            text
          );
          break;
        }
      }
    }

    if (!/\d/.test(text)) {
      // walk through following siblings and their descendants until digits found
      let sib = await el.$("./following-sibling::*[1]");
      while (await sib.isExisting()) {
        const t = await sib.getText();
        if (/\d/.test(t)) {
          text = t;
          console.log(
            "🚀 ~ RestaurantAndCartActions ~ _getPriceFromElement found in sibling:",
            text
          );
          break;
        }
        const sub = await sib.$$("*");
        for (const d of sub) {
          const td = await d.getText();
          if (/\d/.test(td)) {
            text = td;
            console.log(
              "🚀 ~ RestaurantAndCartActions ~ _getPriceFromElement found in sibling descendant:",
              text
            );
            break;
          }
        }
        if (/\d/.test(text)) break;
        sib = await sib.$("./following-sibling::*[1]");
      }
    }

    // strip any known label words that might remain
    text = text.replace(/Subtotal|Delivery Fee|VAT|Platform Fee|Total Payable/gi, "");

    if (!/\d/.test(text)) {
      // last resort – output HTML to aid debugging
      try {
        const html = await el.getHTML(false);
        console.warn("⚠️ could not locate numeric price; element HTML:", html);

        // use execute to inspect parent/sibling in page context
        const parentHtml = await browser.execute(function(element) {
          return element.parentElement ? element.parentElement.outerHTML : null;
        }, el);
        if (parentHtml) {
          console.warn("  parent HTML:", parentHtml);
        }

        const nextHtml = await browser.execute(function(element) {
          let sib = element.nextElementSibling;
          return sib ? sib.outerHTML : null;
        }, el);
        if (nextHtml) {
          console.warn("  next sibling HTML:", nextHtml);
        }
      } catch (e) {
        console.warn("⚠️ could not retrieve debug HTML", e.message);
      }
    }

    return this.parsePrice(text);
  }

  async subtotalPrice() {
    if (!(await restaurantAndCartLocators.subtotalPrice.isExisting())) {
      return 0;
    }
    return this._getPriceFromElement(restaurantAndCartLocators.subtotalPrice);
  }

  async deliveryfreePrice() {
    if (!(await restaurantAndCartLocators.deliveryfreePrice.isExisting())) {
      return 0;
    }
    return this._getPriceFromElement(restaurantAndCartLocators.deliveryfreePrice);
  }

  async vatPrice() {
    if (!(await restaurantAndCartLocators.vatPrice.isExisting())) {
      return 0;
    }
    return this._getPriceFromElement(restaurantAndCartLocators.vatPrice);
  }

  async platformfeePrice() {
    if (!(await restaurantAndCartLocators.platformfeePrice.isExisting())) {
      return 0;
    }
    return this._getPriceFromElement(restaurantAndCartLocators.platformfeePrice);
  }

  async totalpayablePrice() {
    if (!(await restaurantAndCartLocators.totalpayablePrice.isExisting())) {
      return 0;
    }
    return this._getPriceFromElement(restaurantAndCartLocators.totalpayablePrice);
  }
}
module.exports = new RestaurantAndCartActions();
