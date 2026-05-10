const {

  searchSongs

} = require(
  "../services/searchService"
);

const {

  sendSongs

} = require(
  "../services/sendService"
);

async function handleSearch(
  bot,
  msg
) {

  const chatId =
    msg.chat.id;

  const text =
    msg.text;

  // ignore commands
  if (
    !text ||
    text.startsWith("/")
  ) {

    return;

  }

  console.log(
    "Search:",
    text
  );

  const songs =
    await searchSongs(text);

  // no results
  if (
    songs.length === 0
  ) {

    bot.sendMessage(

      chatId,

      "❌ No songs found"

    );

    return;

  }

  bot.sendMessage(

    chatId,

    `🔍 Results for: ${text}`

  );

  sendSongs(

    bot,

    chatId,

    songs,

    "search",

    text,

    0

  );

}

module.exports = {
  handleSearch
};