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
    const restaurants = await restaurantAndCartLocators.allRestaurants;
    const count = restaurants.length;
    if (count === 0) {
      throw new Error("No restaurants found for this location");
    }
    const randomIndex = Math.floor(Math.random() * count);
    console.log(`🚀 Selecting restaurant index: ${randomIndex + 1} / ${count}`);
    await restaurants[randomIndex].scrollIntoView({ block: "center" });
    await restaurants[randomIndex].waitForClickable({ timeout: 10000 });
    await restaurants[randomIndex].click();
  }
}
module.exports = new RestaurantAndCartActions();
