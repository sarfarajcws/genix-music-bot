const mongoose =
require("mongoose");

const songSchema =
new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  message_id: {
    type: Number,
    required: true
  },

  file_unique_id: {

    type: String,

    required: true,

    unique: true

  },

  language: {
    type: String,
    default: "unknown"
  },

  artist: {
    type: String,
    default: "unknown"
  },

  era: {
    type: String,
    default: "Unknown"
  },

  isTrending: {
    type: Boolean,
    default: false
  }

}, {

  timestamps: true

});

module.exports =
mongoose.model(
  "Song",
  songSchema
);