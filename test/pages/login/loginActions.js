const loginLocators = require("./loginLocators");
const { timeouts } = require("../../../test-data/testData");
class LoginActions {
  async clickOnSignInButton() {
    await loginLocators.signInButton.waitForDisplayed({ timeout: timeouts.default });
    await loginLocators.signInButton.click();
  }

  async clickOnSignInWithEmailButton() {
    await loginLocators.signInWithEmailButton.waitForDisplayed({ timeout: timeouts.default });
    await loginLocators.signInWithEmailButton.click();
  }

  async enterEmail(email) {
    await loginLocators.emailInput.waitForDisplayed({ timeout: timeouts.default });
    await loginLocators.emailInput.setValue(email);
  }

  async enterPassword(password) {
    await loginLocators.passwordInput.waitForDisplayed({ timeout: timeouts.default });
    await loginLocators.passwordInput.setValue(password);
  }

  async clickOnSignInAfterCredrentials() {
    await loginLocators.signInAfterCredrentials.waitForDisplayed({ timeout: timeouts.default });
    await loginLocators.signInAfterCredrentials.click();
  }

  async clickOnProfileIcon() {
    await loginLocators.profileIcon.waitForDisplayed({ timeout: timeouts.default });
    await loginLocators.profileIcon.click();
  }

  async clickOnLogOutButton() {
    await loginLocators.logOutButton.waitForDisplayed({ timeout: timeouts.default });
    await loginLocators.logOutButton.click();
  }

  async clickOnCloseButton() {
    await loginLocators.closeButton.waitForDisplayed({ timeout: timeouts.default });
    await loginLocators.closeButton.click();
  }
}
module.exports = new LoginActions();
