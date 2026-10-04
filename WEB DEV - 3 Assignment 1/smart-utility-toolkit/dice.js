const crypto = require("crypto");

function rollDice(times = 5) {
    console.log(`Rolling the dice ${times} times...`);

    for (let i = 1; i <= times; i++) {
        const value = crypto.randomInt(1, 7);
        console.log(`Roll ${i}: ${value}`);
    }
}

if (require.main === module) {
    const times = Number(process.argv[2]) || 5;
    rollDice(times);
}

module.exports = { rollDice };
