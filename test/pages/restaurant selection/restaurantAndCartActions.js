const restaurantAndCartLocators= require("./restaurantAndCartLocators");
class RestaurantAndCartActions {
  async clickOnLocationButton() {
    await restaurantAndCartLocators.locationInput.waitForDisplayed({ timeout: 10000 });
    await restaurantAndCartLocators.locationInput.click();
  }

  async clickOnReLocationButton() {
    await restaurantAndCartLocators.reLocationInput.waitForDisplayed({ timeout: 10000 });
    await restaurantAndCartLocators.reLocationInput.click();
  }

  async clickOnSubmitButton() {
    await restaurantAndCartLocators.submitButtton.waitForDisplayed({ timeout: 10000 });
    await restaurantAndCartLocators.submitButtton.click();
  }

  async clickOnFoodiLogo() {
    await restaurantAndCartLocators.foodiLogo.waitForDisplayed({ timeout: 10000 });
    await restaurantAndCartLocators.foodiLogo.click();
  }

  // async clickOnBanglaFindFood() {
  //   await restaurantAndCartLocators.banglaFindFood.waitForDisplayed({ timeout: 10000 });
  //   await restaurantAndCartLocators.banglaFindFood.click();
  // }
}
module.exports = new RestaurantAndCartActions();