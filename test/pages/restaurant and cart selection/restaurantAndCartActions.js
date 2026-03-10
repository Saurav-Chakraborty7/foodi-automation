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

    // attempt each restaurant until we find one with food items
    for (let idx = 0; idx < Math.min(count, 10); idx++) {
      const randomIndex = Math.floor(Math.random() * count);
      const restaurant = visible[randomIndex];
      console.log(
        `🚀 [attempt ${idx + 1}] Selecting restaurant index: ${randomIndex + 1} / ${count}`
      );
      try {
        await restaurant.scrollIntoView({ block: "center" });
        await restaurant.waitForClickable({ timeout: 15000 });
        await restaurant.click();
        console.log(`✅ clicked restaurant, waiting for menu to load...`);

        // wait for food items to appear
        try {
          await browser.waitUntil(
            async () => {
              const items = await restaurantAndCartLocators.allFoodItems;
              return items.length > 0;
            },
            { timeout: 8000, timeoutMsg: 'no food items loaded' }
          );
          console.log(`✅ food items loaded, proceeding`);
          return;
        } catch (e) {
          console.warn(`⚠️ no food items on this restaurant, going back`);
          await browser.back();
          await browser.pause(500);
          // continue to try next restaurant
        }
      } catch (err) {
        console.warn(
          `⚠️ click failed on restaurant index ${randomIndex + 1}: ${err.message}`
        );
      }
    }

    throw new Error("Unable to find a restaurant with food items after multiple attempts");
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
    const maxAttempts = 5;
    for (let i = 1; i <= maxAttempts; i++) {
      try {
        await restaurantAndCartLocators.checkoutButton.waitForDisplayed({
          timeout: 10000,
        });
        await restaurantAndCartLocators.checkoutButton.scrollIntoView({ block: "center" });
        // extra pause to ensure button is clickable
        await browser.pause(500);
        await restaurantAndCartLocators.checkoutButton.waitForClickable({ timeout: 10000 });
        await restaurantAndCartLocators.checkoutButton.click();
        console.log(`✅ checkout button clicked successfully`);
        return;
      } catch (err) {
        console.warn(`⚠️ checkout click attempt ${i} failed: ${err.message}`);
        if (i === maxAttempts) {
          throw err;
        }
        // scroll page to ensure button is fully visible
        await browser.execute(() => window.scrollBy(0, 300));
        await browser.pause(1500);
      }
    }
  }
  // helper
  parsePrice(text) {
    // convert any text (e.g. "Subtotal: \u20b9100.00") into a numeric value
    if (!text) return 0;

    // strip out anything that is not a digit, dot or comma (some locales use comma as
    // thousands separator).  we'll also remove comma separators before parsing so
    // parseFloat doesn't get confused.
    let cleaned = text.replace(/[^\d.,]/g, "");
    // remove thousands separators if present
    cleaned = cleaned.replace(/,/g, "");

    const value = parseFloat(cleaned);
    if (isNaN(value)) {
      console.warn(`⚠️ parsePrice could not convert \"${text}\" to a number`);
      return 0;
    }

    // ensure the return type is always a Number (not a string)
    console.log("🚀 ~ RestaurantAndCartActions ~ parsePrice ~ value:", value);
    return value;
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

  // generic helper used by the accessors so we can inject extra debug
  async _getPriceWithDebug(label, locator) {
    const exists = await locator.isExisting();
    console.log(`🔍 checking price for '${label}', locator exists?`, exists);
    if (!exists) {
      // try to find elements containing the label anywhere so we can log what
      // actually exists on the page
      const candidates = await $$(`//p[contains(normalize-space(),'${label}')]`);
      console.log(`   fallback candidates for '${label}':`, candidates.length);
      for (const c of candidates) {
        try {
          console.log(`     text:`, await c.getText());
          console.log(`     html:`, await c.getHTML(false));
        } catch (e) {
          console.warn(`     cannot read candidate:`, e.message);
        }
      }
      return 0;
    }
    return this._getPriceFromElement(locator);
  }

  async subtotalPrice() {
    return this._getPriceWithDebug('Subtotal', restaurantAndCartLocators.subtotalPrice);
  }

  async deliveryfreePrice() {
    return this._getPriceWithDebug('Delivery Fee', restaurantAndCartLocators.deliveryfreePrice);
  }

  async vatPrice() {
    return this._getPriceWithDebug('VAT', restaurantAndCartLocators.vatPrice);
  }

  async platformfeePrice() {
    return this._getPriceWithDebug('Platform Fee', restaurantAndCartLocators.platformfeePrice);
  }

  async totalpayablePrice() {
    if (await restaurantAndCartLocators.totalpayablePrice.isExisting()) {
      return this._getPriceFromElement(restaurantAndCartLocators.totalpayablePrice);
    }
    const youPay = await $$('//p[contains(normalize-space(),"You Pay")]');
    if (youPay.length > 0) return this._getPriceFromElement(youPay[0]);
    const allPs = await $$('p');
    let max = 0;
    for (const p of allPs) {
      const txt = await p.getText();
      if (/TK|Tk/.test(txt)) {
        const pr = this.parsePrice(txt);
        if (pr > max) max = pr;
      }
    }
    return max;
  }
}
module.exports = new RestaurantAndCartActions();
