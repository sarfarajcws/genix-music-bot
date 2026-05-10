const Song =
require("../database/songModel");

async function searchSongs(
  query
) {

  return await Song.find({

    title: {

      $regex: query,

      $options: "i"

    }

  }).sort({

    createdAt: -1

  });

}

module.exports = {
  searchSongs
};