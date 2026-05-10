require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const { BOT_TOKEN } = require("./config");

const { getHomeKeyboard } = require("./ui/homeUI");

const { handleCallback } = require("./handlers/callbackHandler");

const { handleUpload } =
require("./handlers/uploadHandler");

const connectDB =
require("./database/connect");

const {
  handleSearch
} = require("./handlers/searchHandler");

const bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});

connectDB();

bot.onText(/\/start/, (msg) => {

  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "🎵 Welcome to Genix Music",
    getHomeKeyboard()
  );

});

bot.on("callback_query", async (query) => {

  handleCallback(bot, query);

});

bot.on("channel_post", async (msg) => {

  handleUpload(bot, msg);

});

bot.on("message", async (msg) => {

  handleSearch(bot, msg);

});

console.log("🎵 Genix Music Bot Running...");