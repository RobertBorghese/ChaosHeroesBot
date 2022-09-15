'use strict';

// Reads "ImportantBotInfo.txt" as text
// Splits by "\n", so it creates an array of strings for each line
const botInfo = fs.readFileSync("./ImportantBotInfo.txt").split("\n");

// Load "ChaosHeroesLINEBot" class from code folder
const ChaosHeroesLINEBot = require("./code/ChaosHeroesLINEBot.js");

// Create LINE Bot
globalThis.LINEBot = new ChaosHeroesLINEBot(botInfo[0], botInfo[1]);

