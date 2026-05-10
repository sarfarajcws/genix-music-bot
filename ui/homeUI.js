function getHomeKeyboard() {

  return {
    reply_markup: {
      inline_keyboard: [

        [
          {
            text: "🌍 Languages",
            callback_data: "menu_languages"
          }
        ],

        [
          {
            text: "🎤 Artists",
            callback_data: "menu_artists"
          }
        ],

        [
          {
            text: "📅 Era",
            callback_data: "menu_era"
          }
        ],

        [
          {
            text: "🔥 Trending",
            callback_data: "menu_trending"
          }
        ]

      ]
    }
  };

}

module.exports = {
  getHomeKeyboard
};