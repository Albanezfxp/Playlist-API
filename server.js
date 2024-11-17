const express = require("express");
const playlistControllers = require("./playlistControllers");
const app = express();
app.use(express.json());

app.get("/", () => console.log("API PLAYLIST"));

app.get("/playlists", playlistControllers.index);
app.get("/playlist/:id", playlistControllers.show);

app.post("/playlists", playlistControllers.save);
app.post("/playlists/:id/musics", playlistControllers.addMusic);

app.put("/playlists/:id", playlistControllers.update);

app.delete("/playlists/:id", playlistControllers.delete);
app.delete("playlists/:id/tags/:tags", playlistControllers.deleteTags);
app.delete("/playlists/:id/music", playlistControllers.deleteMusic);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost/:${PORT}`)
);
