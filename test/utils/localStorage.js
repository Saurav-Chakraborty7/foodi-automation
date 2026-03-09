class LocalStorageHelper {

  async captureLocation() {
    return await browser.execute(() => ({
      latitude: localStorage.getItem("latitude"),
      longitude: localStorage.getItem("longitude"),
      formatted_address: localStorage.getItem("formatted_address"),
      zoneId: localStorage.getItem("zoneId"),
      vertical: localStorage.getItem("vertical")
    }));
  }

  async setLocation(data) {
    await browser.execute((loc) => {
      Object.entries(loc).forEach(([key, value]) => {
        if (value) localStorage.setItem(key, value);
      });
    }, data);
  }
}

module.exports = new LocalStorageHelper();