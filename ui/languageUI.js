function getLanguageKeyboard() {

  return {
    reply_markup: {
      inline_keyboard: [

        [
          {
            text: "🇮🇳 Hindi",
            callback_data: "lang_hindi"
          }
        ],

        [
          {
            text: "🇬🇧 English",
            callback_data: "lang_english"
          }
        ],

        [
          {
            text: "🇵🇰 Punjabi",
            callback_data: "lang_punjabi"
          }
        ],

        [
          {
            text: "🇮🇳 Tamil",
            callback_data: "lang_tamil"
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
  getLanguageKeyboard
};