const {

  CHANNEL_ID,

  PAGE_SIZE

} = require("../config");

const Song =
require("../database/songModel");

function sleep(ms) {

  return new Promise(resolve =>
    setTimeout(resolve, ms)
  );

}

async function sendSongs(

  bot,

  chatId,

  songs,

  type,

  value,

  offset = 0

) {

  const pageSongs =
    songs.slice(
      offset,
      offset + PAGE_SIZE
    );

  // 🎵 Send Songs
  for (const song of pageSongs) {

    try {

      await bot.copyMessage(

        chatId,

        CHANNEL_ID,

        song.message_id,

        {

          caption: " "

        },

      );

    }

    catch (error) {

      console.log(

        `Invalid message removed: ${song.title}`

      );

      // remove broken song
      await Song.deleteOne({

        _id: song._id

      });

      continue;

    }

    await sleep(400);

  }

  // 🔁 Pagination
  const nextOffset =
    offset + PAGE_SIZE;

  let buttons = [];

  // More button
  if (
    nextOffset < songs.length
  ) {

    buttons.push([

      {

        text: "More ▶",

        callback_data:
          `more_${type}_${value}_${nextOffset}`,

      },

    ]);

  }

  // Back button
  buttons.push([

    {

      text: "⬅ Back",

      callback_data:
        "back_home",

    },

  ]);

  bot.sendMessage(

    chatId,

    "Options:",

    {

      reply_markup: {

        inline_keyboard:
          buttons,

      },

    }

  );

}

module.exports = {
  sendSongs,
};