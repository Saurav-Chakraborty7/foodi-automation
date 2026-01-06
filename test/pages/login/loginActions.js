const loginLocators = require("./loginLocators");
class LoginActions {
  async clickOnSignInButton() {
    await loginLocators.signInButton.waitForDisplayed({ timeout: 10000 });
    await loginLocators.signInButton.click();
  }

  async clickOnSignInWithEmailButton() {
    await loginLocators.signInWithEmailButton.waitForDisplayed({ timeout: 10000 });
    await loginLocators.signInWithEmailButton.click();
  }

  async enterEmail(email) {
    await loginLocators.emailInput.waitForDisplayed({ timeout: 10000 });
    await loginLocators.emailInput.setValue(email);
  }

  async enterPassword(password) {
    await loginLocators.passwordInput.waitForDisplayed({ timeout: 10000 });
    await loginLocators.passwordInput.setValue(password);
  }

  async clickOnSignInAfterCredrentials() {
    await loginLocators.signInAfterCredrentials.waitForDisplayed({ timeout: 10000 });
    await loginLocators.signInAfterCredrentials.click();
    await driver.pause(5000);
  }

  async clickOnProfileIcon() {
    await loginLocators.profileIcon.waitForDisplayed({ timeout: 10000 });
    await loginLocators.profileIcon.click();
  }

  async clickOnLogOutButton() {
    await loginLocators.logOutButton.waitForDisplayed({ timeout: 10000 });
    await loginLocators.logOutButton.click();
  }

  async clickOnCloseButton() {
    await loginLocators.closeButton.waitForDisplayed({ timeout: 10000 });
    await loginLocators.closeButton.click();
  }
}
module.exports = new LoginActions();
