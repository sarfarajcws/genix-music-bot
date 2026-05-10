const Song =
require("../database/songModel");

let uploadQueue = [];

let queueTimeout = null;

async function processUpload(msg) {

  const title =
    msg.audio.title ||
    msg.audio.file_name;

  const message_id =
    msg.message_id;

  const file_unique_id =
    msg.audio.file_unique_id;

  // add to queue
  uploadQueue.push({

    title,

    message_id,

    file_unique_id

  });

  // reset old timeout
  clearTimeout(queueTimeout);

  // start new timeout
  queueTimeout = setTimeout(() => {

    console.log(
      "Queue expired. Clearing pending songs..."
    );

    uploadQueue = [];

  }, 30000);

  const caption =
    msg.caption || "";

  // wait for tags
  if (!caption) {

    console.log(
      "Waiting for tags..."
    );

    return;

  }

  await saveQueuedSongs(
    caption
  );

}

async function saveQueuedSongs(
  caption
) {

  // extract hashtags
  const tags =
    caption.match(/#\w+/g) || [];

  let language = "unknown";

  let artist = "unknown";

  let isTrending = false;

  tags.forEach(tag => {

    const value =
      tag.replace("#", "")
      .toLowerCase();

    // 🌍 Language
    if (

      [
        "hindi",
        "english",
        "punjabi",
        "tamil"
      ].includes(value)

    ) {

      language = value;

    }

    // 🎤 Artist
    else if (

      [
        "arijit",
        "atif",
        "kk",
        "jubin"
      ].includes(value)

    ) {

      artist = value;

    }

    // 🔥 Trending
    else if (
      value === "trending"
    ) {

      isTrending = true;

    }

  });

  // save all queued songs
  for (const song of uploadQueue) {

    // duplicate check
    const exists =
      await Song.findOne({

        file_unique_id:
          song.file_unique_id

      });

    if (exists) {

      console.log(
        `Duplicate skipped: ${song.title}`
      );

      continue;

    }

    await Song.create({

      title: song.title,

      message_id:
        song.message_id,

      file_unique_id:
        song.file_unique_id,

      language,

      artist,

      isTrending

    });

    console.log(
      `Added: ${song.title}`
    );

  }

  console.log(
    `${uploadQueue.length} songs processed`
  );

  // stop timeout
  clearTimeout(queueTimeout);

  // clear queue
  uploadQueue = [];

}

module.exports = {
  processUpload
};