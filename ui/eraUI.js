function getEraKeyboard() {

  return {
    reply_markup: {
      inline_keyboard: [

        [
          {
            text: "📅 80s",
            callback_data: "era_80s"
          }
        ],

        [
          {
            text: "📅 90s",
            callback_data: "era_90s"
          }
        ],

        [
          {
            text: "📅 2000s",
            callback_data: "era_2000s"
          }
        ],

        [
          {
            text: "📅 2010s",
            callback_data: "era_2010s"
          }
        ],

        [
          {
            text: "📅 2020s",
            callback_data: "era_2020s"
          }
        ],

        [
          {
            text: "⬅ Back",
            callback_data: "back_home"
          }
        ]

      ]
    }
  };

}

module.exports = {
  getEraKeyboard
};