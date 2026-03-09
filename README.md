# foodi-automation

A WebdriverIO-based end-to-end automation suite for the [Foodi](https://foodibd.com/) web application.  This project exercises the login flow and restaurant/food ordering features using a page‑object model and data helpers.

---

## 🔧 Project Structure

```
package.json
wdio.conf.js            # WebdriverIO configuration
pingTest.js             # quick sanity script
README.md

test/                   # all automation code
  specs/                # Mocha test files
    login.spec.js
    restaurant.spec.js
  pages/                # page objects split by feature
    login/
      loginActions.js
      loginLocators.js
    restaurant selection/
      restaurantAndCartActions.js
      restaurantAndCartLocators.js
  utils/                # helpers and shared logic
    auth.js             # re‑usable login helper
    localStorage.js     # browser localStorage helpers
    utils.js            # random value generators
  setup/
    location.setup.js   # captures and persists dynamic location info

test-data/              # persisted artifacts (e.g. location.json)
  location.json
```

> **Note:** folder names containing spaces (`restaurant selection`) match the original project layout.

## ✅ What the tests cover

* **Login Suite** (`login.spec.js`)
  * Valid and invalid credential flows
  * Required‑field validation
  * Password masking check
  * Logout cleanup after each test

* **Restaurant & Cart Suite** (`restaurant.spec.js`)
  * Captures/run uses a dynamic location stored in `test-data/location.json`
  * Random restaurant selection
  * Random food item selection and add‑to‑cart

Support code includes helpers for setting location in localStorage, capturing it on every run, and generic utilities.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (>=14) and npm installed on your machine
* Chrome browser (tests are configured to run against Chromium/Chrome)

### Installation

```bash
# clone the repository
git clone <repo-url> foodi-automation
cd foodi-automation

# install dependencies
npm install
```

### Running the tests

By default the suite runs all specs using the config in `wdio.conf.js`.

```bash
npm test        # runs `wdio run ./wdoı.conf.js`
```

You can also target a suite defined in the configuration:

```bash
npx wdio run ./wdio.conf.js --suite login
npx wdio run ./wdio.conf.js --suite restaurant
```

> If `test-data/location.json` is missing or outdated the first restaurant test will automatically capture a fresh location.

### Adding or modifying tests

Tests follow a simple page‑object pattern.  Add new locators in the appropriate `Locators` class and expose actions via the matching `Actions` class.  Refer to existing specs for examples.

### Test data

Location information is stored in `test-data/location.json`.  The `location.setup.js` helper records the current browser localStorage values and persists them so that the restaurant suite can replay the location across page reloads.

---

## 📝 Notes

* Logging is silenced (`logLevel: "silent"`) to keep output clean.
* The project uses Mocha with BDD syntax and the `spec` reporter.
* The configuration is local-only but can be extended with additional services (BrowserStack, Sauce, etc.) as commented in `wdio.conf.js`.

---

Feel free to copy, extend or refactor this framework to suit additional Foodi scenarios or other web applications.