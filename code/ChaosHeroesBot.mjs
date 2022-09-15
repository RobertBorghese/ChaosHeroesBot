
// This is the main class that handles most behavior.
// This class is "extended" by ChaosHeroesDiscordBot and ChaosHeroesLINEBot.
// The extended versions are used to add unique behavior based on the platform.
// But both extended versions share similar behavior, which is defined in this class.
export default class ChaosHeroesBot {
	constructor() {
	}

	onMessage(text, ctx) {
		if(text == "ping") {
			this.sendMessage("pong", ctx);
		}
	}

	sendMessage() {
		// This function is overridden by the child classes
		// since both LINE and Discord have different code
		// for sending a message.
	}
}