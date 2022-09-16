'use strict';

import { readFileSync } from "fs";

// Reads "ImportantBotInfo.txt" as text
// Splits by "\n", so it creates an array of strings for each line
const botInfo = readFileSync("./ImportantBotInfo.txt");
const botTokens = botInfo.toString().split("\n").map(str => str.trim());

// Load "ChaosHeroesLINEBot" class from code folder
import ChaosHeroesLINEBot from "./code/ChaosHeroesLINEBot.mjs";

// Create LINE Bot
if(!botTokens[0].startsWith("<") && !botTokens[1].startsWith("<")) {
	globalThis.LINEBot = new ChaosHeroesLINEBot(botTokens[0], botTokens[1], botTokens[3]);
}

