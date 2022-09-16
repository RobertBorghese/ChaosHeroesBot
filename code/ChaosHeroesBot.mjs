
import { readFileSync } from "fs";

// This is the main class that handles most behavior.
// This class is "extended" by ChaosHeroesDiscordBot and ChaosHeroesLINEBot.
// The extended versions are used to add unique behavior based on the platform.
// But both extended versions share similar behavior, which is defined in this class.
export default class ChaosHeroesBot {
	constructor() {
		this.setupFighterData();
	}

	setupFighterData() {
		const fightersText = readFileSync("data/fighters.json");
		this.fighters = JSON.parse(fightersText);
		for(let i = 0; i < this.fighters.length; i++) {
			this.fighters[i].searchName = this._convertToSearch(this.fighters[i].name);
		}
	}

	onMessage(text, ctx) {
		let lowerText = text.toLowerCase();

		if(this._fighterCache &&
			ctx.source.userId === this._fighterCache[1] &&
			lowerText.trim() === "more"
		) {
			const msg = this.generateFigherMessageEx(this._fighterCache[0]);
			this._fighterCache = null;
			return this.reply(msg, ctx);
		} else {
			this._fighterCache = null;
		}

		let result = this.checkForFighter(lowerText, ctx);
		if(result !== null) return result;

		return Promise.resolve(null);
	}

	checkForFighter(lowerText, ctx) {
		const fighterPrefix = "fighter ";
		if(lowerText.startsWith(fighterPrefix)) {
			const f = this.convertInputToFighter(lowerText.substring(fighterPrefix.length));
			if(f != null) {
				if(f.length > 1) {
					const names = f.map(f => f.name);
					const end = names[names.length - 1];
					names[names.length - 1] = ("or " + end);
					return this.reply("Did you mean " + (names.join(", ")) + "?", ctx);
				} else if(f.length === 0) {
					return this.reply("Could not find fighter.", ctx);
				} else {
					this._fighterCache = [f[0], ctx.source.userId];
					return this.reply(this.generateFigherMessage(f[0]), ctx);
				}
			}
		}
		return null;
	}

	generateFigherMessage(f) {
		return `[${f.name}]
${f.indirect.join(" / ")}
${f.element} Mastery

(Type "more" for more info)`;
	}

	generateFigherMessageEx(f) {
		if(!f || !f.stats) return "No fighter data??";
		let result = `[${f.name}]
Weapon: ${f.weapon}

STR: ${f.stats[0]} (+${f.stats[1]} per level)
DEX: ${f.stats[2]} (+${f.stats[3]} per level)
STA: ${f.stats[4]} (+${f.stats[5]} per level)

Each ${f.indirect[0]} STR adds 1% ATK
Each ${f.indirect[1]} DEX adds 1 SPD & 1 EVA
Each ${f.indirect[2]} STA adds 1% HP & 1 SP

${f.element} Mastery`;

if(f.designer) {
	result += `

Designer: ${f.designer ? f.designer : ""}`;
}

return result;
	}

	_convertToSearch(str) {
		return str.trim().replace(/[\s\.]/g, "").toLowerCase();
	}

	convertInputToFighter(inputName) {
		const choices = [];
		inputName = this._convertToSearch(inputName);
		for(let i = 0; i < this.fighters.length; i++) {
			if(this.fighters[i].searchName.startsWith(inputName)) {
				choices.push(this.fighters[i]);
			}
		}
		return choices;
	}

	sendMessage() {
		// This function is overridden by the child classes
		// since both LINE and Discord have different code
		// for sending a message.
	}

	reply(msg, ctx) {
		throw "this should never be called";
	}
}