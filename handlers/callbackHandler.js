const { getLanguageKeyboard } =
require("../ui/languageUI");

const { getHomeKeyboard } =
require("../ui/homeUI");

const { getArtistKeyboard } =
require("../ui/artistUI");

const { getEraKeyboard } =
require("../ui/eraUI");

const {

  getSongsByLanguage,

  getSongsByArtist,

  getSongsByEra,

  getTrendingSongs,

} = require("../services/filterService");

const { sendSongs } =
require("../services/sendService");

const { searchSongs } =
require("../services/searchService");

async function handleCallback(
  bot,
  query
) {

  const chatId =
    query.message.chat.id;

  const data =
    query.data;

  // 🌍 Languages Menu
  if (
    data === "menu_languages"
  ) {

    bot.sendMessage(

      chatId,

      "🌍 Select Language",

      getLanguageKeyboard(),

    );

  }

  // 🎤 Artists Menu
  if (
    data === "menu_artists"
  ) {

    bot.sendMessage(

      chatId,

      "🎤 Select Artist",

      await getArtistKeyboard(),

    );

  }

  // 📅 Era Menu
  if (
    data === "menu_era"
  ) {

    bot.sendMessage(

      chatId,

      "📅 Select Era",

      getEraKeyboard(),

    );

  }

  // 🌍 Language Songs
  if (
    data.startsWith("lang_")
  ) {

    const language =
      data.split("_")[1];

    const songs =
      await getSongsByLanguage(
        language
      );

    sendSongs(

      bot,

      chatId,

      songs,

      "lang",

      language,

      0,

    );

  }

  // 🎤 Artist Songs
  if (
    data.startsWith("artist_")
  ) {

    const artist =
      data.split("_")[1];

    const songs =
      await getSongsByArtist(
        artist
      );

    sendSongs(

      bot,

      chatId,

      songs,

      "artist",

      artist,

      0,

    );

  }

  // 📅 Era Songs
  if (
    data.startsWith("era_")
  ) {

    const era =
      data.split("_")[1];

    const songs =
      await getSongsByEra(
        era
      );

    sendSongs(

      bot,

      chatId,

      songs,

      "era",

      era,

      0,

    );

  }

  // 🔥 Trending Songs
  if (
    data === "menu_trending"
  ) {

    const songs =
      await getTrendingSongs();

    sendSongs(

      bot,

      chatId,

      songs,

      "trending",

      "all",

      0,

    );

  }

  // ⬅ Back to Home
  if (
    data === "back_home"
  ) {

    bot.sendMessage(

      chatId,

      "🎵 Welcome to Genix Music",

      getHomeKeyboard(),

    );

  }

  // 🔁 More Pagination
  if (
    data.startsWith("more_")
  ) {

    const parts =
      data.split("_");

    const type =
      parts[1];

    const value =
      parts[2];

    const offset =
      Number(parts[3]);

    let songs = [];

    // 🌍 Language
    if (
      type === "lang"
    ) {

      songs =
        await getSongsByLanguage(
          value
        );

    }

    // 🎤 Artist
    if (
      type === "artist"
    ) {

      songs =
        await getSongsByArtist(
          value
        );

    }

    // 📅 Era
    if (
      type === "era"
    ) {

      songs =
        await getSongsByEra(
          value
        );

    }

    // 🔥 Trending
    if (
      type === "trending"
    ) {

      songs =
        await getTrendingSongs();

    }

    // 🔍 Search
    if (
      type === "search"
    ) {

      songs =
        await searchSongs(
          value
        );

    }

    sendSongs(

      bot,

      chatId,

      songs,

      type,

      value,

      offset,

    );

  }

}

module.exports = {
  handleCallback,
};