const { processUpload } =
require("../services/uploadService");

async function handleUpload(bot, msg) {

  if (!msg.audio) return;

  processUpload(msg);

}

module.exports = {
  handleUpload
};