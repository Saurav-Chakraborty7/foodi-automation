const loginActions = require("../pages/login/loginActions");

module.exports.loginAsValidUser = async (email, password) => {
    await loginActions.clickOnSignInButton();
    await loginActions.clickOnSignInWithEmailButton();
    await loginActions.enterEmail(email);
    await loginActions.enterPassword(password);
    await loginActions.clickOnSignInAfterCredrentials();
};
