const fs = require("fs");
const { timeouts } = require("../../test-data/testData");
const path = require("path");

const localStorage = require("../utils/localStorage");
const restaurantActions = require("../pages/restaurant and cart selection/restaurantAndCartActions");

module.exports = async function captureLocationEveryRun() {
  const dirPath = path.resolve("./test-data");
  const filePath = path.join(dirPath, "location.json");

  // Ensure folder exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  //console.log("📍 Capturing Foodi location for this run...");

  // Let Foodi resolve location normally
  await restaurantActions.clickOnReLocationButton();
  await restaurantActions.clickOnLocationButton();
  await restaurantActions.clickOnSubmitButton();

  // Wait until app is stable
  await $('img[alt="Logo"]').waitForDisplayed({ timeout: timeouts.long });

  const locationData = await localStorage.captureLocation();

  if (!locationData.zoneId) {
    throw new Error("❌ Location capture failed: zoneId missing");
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify(locationData, null, 2)
  );

  //console.log("✅ Location captured for this run");
};
