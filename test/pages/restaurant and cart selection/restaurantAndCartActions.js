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

  async selectRandomFoodItem() {
    const foodItems = await restaurantAndCartLocators.allFoodItems;
    const count = foodItems.length;
    if (count === 0) {
      throw new Error("No Food Items found for this restaurant");
    }
    const randomIndex = Math.floor(Math.random() * count);
    console.log(`🚀 Selecting food item index: ${randomIndex + 1} / ${count}`);
    await foodItems[randomIndex].scrollIntoView({ block: "center" });
    await foodItems[randomIndex].waitForClickable({ timeout: 10000 });
    await foodItems[randomIndex].click();
  }

  async clickAddToCartButton() {
      await restaurantAndCartLocators.addToCartButton.waitForDisplayed({
      timeout: 10000,
    });
    await restaurantAndCartLocators.addToCartButton.click();
  }
  async getOriginalPrice() {
    const originalPrice = await restaurantAndCartLocators.originalPrice;
    return parseInt(originalPrice.textContent.replace(/[^\d]/g, ''))
  }
  async getDiscountedPrice() {
    const discountedPrice = await restaurantAndCartLocators.discountedPrice;
    return parseInt(discountedPrice.textContent.replace(/[^\d]/g, ''))
  }
}
module.exports = new RestaurantAndCartActions();