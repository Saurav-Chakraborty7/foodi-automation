class Utils {
  async randomNumber(max, min) {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomValue;
  }
  async randomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
module.exports = new Utils();
