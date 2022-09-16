'use strict';

import line from '@line/bot-sdk';
import express from 'express';
import { connect } from "ngrok";

import ChaosHeroesBot from "./ChaosHeroesBot.mjs";

export default class ChaosHeroesLINEBot extends ChaosHeroesBot {
	constructor(channelAccessToken, channelSecret, ngrokToken) {
		// call ChaosHeroesBot constructor
		super();

		const config = { channelAccessToken, channelSecret };

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

		// if a ngrok authorization token is available, use it to tunnel
		if(ngrokToken) {
			connect({
				authtoken: ngrokToken,
				addr: port
			}).then(this.ngrokReady.bind(this));
		}
	}

	onReady(port) {
		console.log(`LINE bot active on port ${port}`);
	}

	ngrokReady(url) {
		console.log(`ngrok ready at URL: ${url}`);
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
		console.log(event);
		console.log(event.type);
		if (event.type === 'message' && event.message.type === 'text') {
			return this.onMessage(event.message.text, event);
		}

		// ignore non-text-message event
		return Promise.resolve(null);
	}

	reply(msg, ctx) {
		const data = { type: "text", text: msg };
		return this.client.replyMessage(ctx.replyToken, data);
	}
}
