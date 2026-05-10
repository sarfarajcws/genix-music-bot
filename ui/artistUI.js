const artistMap =
require("../utils/artistMap");

const {

  getAllArtists

} = require(
  "../services/filterService"
);

async function getArtistKeyboard() {

  const artists =
    await getAllArtists();
  

  const keyboard = [];

  artists.forEach(artist => {

    keyboard.push([

      {

        text:
          `🎤 ${
            artistMap[artist]
            || artist
          }`,

        callback_data:
          `artist_${artist}`

      }

    ]);

  });

  // back button
  keyboard.push([

    {

      text: "⬅ Back",

      callback_data:
        "back_home"

    }

  ]);

  return {

    reply_markup: {

      inline_keyboard:
        keyboard

    }

  };

}

module.exports = {
  getArtistKeyboard
};