const isEven = require("./modules/isEven");
const logger = require("./modules/logger");

console.log("=== Custom Module Demo ===");
logger("Checking numbers using a reusable custom module");

[12, 7, 20].forEach((number) => {
    console.log(`${number} -> ${isEven(number) ? "Even" : "Odd"}`);
});

console.log("Module execution completed.");
