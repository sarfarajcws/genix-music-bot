const Song =
require("../database/songModel");

async function getSongsByLanguage(
  language
) {

  return await Song.find({

    language

  }).sort({

    createdAt: -1

  });

}

async function getSongsByArtist(
  artist
) {

  return await Song.find({

    artist

  }).sort({

    createdAt: -1

  });

}

async function getTrendingSongs() {

  return await Song.find({

    isTrending: true

  }).sort({

    createdAt: -1

  });

}

async function getAllArtists() {

  const songs =
    await Song.find();

  const artists =
    songs.map(song => song.artist);

  return [...new Set(artists)]
    .filter(
      artist =>
        artist !== "unknown"
    );

}

module.exports = {

  getSongsByLanguage,

  getSongsByArtist,

  getTrendingSongs,

  getAllArtists

};