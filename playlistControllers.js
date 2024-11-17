const playlists = [];

function findIndex(index) {
  const i = playlists.findIndex((playlist) => playlist.id === +index);

  if (i === -1) {
    return res.status(404).json({ messege: "Playlist not found" });
  } else {
    return i;
  }
}

module.exports = {
  // GET /playlists
  index: (req, res) => {
    res.status(200);
    res.json(playlists);
  },
  // GET /playlist/:id
  show: (req, res) => {
    const { id } = req.params;
    const playlist = playlists.find((playlist) => playlist.id === +id);

    if (!playlist) {
      res.status(404).json({ messege: "Playlist not found!" });
    } else {
      res.status(200).json(playlist);
    }
  },
  // POST /playlists
  save: (req, res) => {
    const { name, tags, music } = req.body;
    const newPlaylist = {
      id: Math.floor(Math.random() * 9999),
      name,
      tags,
      music,
    };
    playlists.push(newPlaylist);
    res.status(201).json(newPlaylist);
  },
  // POST /playlists/:id/musics
  addMusic: (req, res) => {
    const { music, singer, year, album } = req.body;
    const { id } = req.params;
    const newMusic = {
      music,
      singer,
      year,
      album,
      id: Math.floor(Math.random() * 9999),
    };

    const playlistIndex = findIndex(id);

    if (typeof music === "string") {
      playlists[playlistIndex].music.push(newMusic);
    }
    res.status(200);
    res.json(playlists[playlistIndex]);
  },
  // PUT /playlists/:id
  update: (req, res) => {
    const { name, tags } = req.body;
    const { id } = req.params;

    const playlistIndex = findIndex(id);

    if (typeof name === "string") {
      playlists[playlistIndex].name = name;
    }
    if (typeof tags === "string") {
      playlists[playlistIndex].tags.push(tags);
    }

    res.status(200).json(playlists[playlistIndex]);
  },
  // DELETE /playlists/:id
  delete: (req, res) => {
    const { id } = req.params;
    const playlistIndex = findIndex(id);

    playlists.splice(playlistIndex, 1);
    res.status(204).end();
  },
  // DELETE /playlists/:id/tags/:tags
  deleteTags: (req, res) => {
    const { id, tags } = req.params;
    const playlistIndex = findIndex(id);

    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    if (
      !tags ||
      typeof tags !== "string" ||
      !playlists[playlistIndex].tags.includes(tags)
    ) {
      return res.status(400).json({ message: "Invalid tag!" });
    }

    playlists[playlistIndex].tags = playlists[playlistIndex].tags.filter(
      (tag) => tag !== tags
    );

    res.status(200).json({ message: `Tag '${tags}' removed successfully!` });
  },
  // DELETE /playlists/:id/music
  deleteMusic: (req, res) => {
    const { id, musicId } = req.params;
    const playlistIndex = findIndex(id);

    if (playlistIndex === -1) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    const musicIndex = playlists[playlistIndex].music.findIndex(
      (song) => song.id === +musicId
    );

    if (musicIndex === -1) {
      return res.status(404).json({ message: "Music not found!" });
    }

    playlists[playlistIndex].music.splice(musicIndex, 1);

    res
      .status(200)
      .json({ message: `Music with ID '${musicId}' removed successfully!` });
  },
};
