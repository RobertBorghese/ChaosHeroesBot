'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

const ChaosHeroesBot = require("./ChaosHeroesBot.js");

export default class ChaosHeroesLINEBot extends ChaosHeroesBot {
	constructor(channelAccessToken, channelSecret) {
		// create LINE SDK client
		this.client = new line.Client(config);

		// create Express app
		// about Express itself: https://expressjs.com/
		this.app = express();

		// register a webhook handler with middleware
		// about the middleware, please refer to doc
		this.app.post('/callback', line.middleware(config), this.onRequest.bind(this));

		// listen on port
		const port = process.env.PORT || 3000;
		this.app.listen(port, this.onReady.bind(this, port));
	}

	onReady(port) {
		console.log(`LINE bot active on port ${port}`);
	}

	onRequest(req, res) {
		Promise
			.all(req.body.events.map(this.handleEvent.bind(this)))
			.then((result) => res.json(result))
			.catch((err) => {
				console.error(err);
				res.status(500).end();
			});
	}

	handleEvent(event) {
		if (event.type !== 'message' || event.message.type !== 'text') {
			// ignore non-text-message event
			return Promise.resolve(null);
		}

		// create a echoing text message
		const echo = { type: 'text', text: event.message.text };

		// use reply API
		return client.replyMessage(event.replyToken, echo);
	}
}
