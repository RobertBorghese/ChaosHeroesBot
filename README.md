# Chaos Heroes Bot
A LINE and Discord bot for retrieving and calculating information regarding the mobile game [Chaos Heroes](https://apps.apple.com/us/app/chaos-heroes/id1492673616).

## Requirements

Requires [NodeJS](https://nodejs.org/en/) and compontent enough knowledge of coding to modify and run the code yourself.

## How to edit and Run in your own bot in LINE

First go to https://developers.line.biz/console/channel/new?type=messaging-api, sign into your LINE account and register new "Messaging API"/"Channel" (I don't know why they call it something weird like "Channel", what they mean is your LINE Bot).

Once you've created it, it should open "Basic Settings", scroll down and get "Channel secret". Write it down somewhere.

Go to the "Messaging API" section (click the tab at the top of the page). Then scroll down and get the "Channel access token".

Download this code (top-right green button).

Unzip the folder.

Open the "ImportantBotInfo.txt" file and replace the first line with your "Channel access token". Replace the second line with your "Channel secret". (Please note this is the reverse order that you obtained these tokens).

Open "Command Prompt"/"Terminal", type `cd [path-to-unziped-folder-you-downloaded-from-here-in-last-step]`, and hit enter.

Type `node bot.js`, hit enter.

The bot should now run.

## How to edit and Run in your own bot in Discord

TODO
