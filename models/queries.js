const pool = require("./pool");

const getAllGamesQuery = `SELECT
  g.id,
  g.game,
  COALESCE(string_agg(DISTINCT ge.genre, ', ' ORDER BY ge.genre)
           FILTER (WHERE ge.id IS NOT NULL), '') AS genres,
  COALESCE(string_agg(DISTINCT p.platform, ', ' ORDER BY p.platform)
           FILTER (WHERE p.id IS NOT NULL), '') AS platforms,
  COALESCE(string_agg(DISTINCT d.developer, ', ' ORDER BY d.developer)
           FILTER (WHERE d.id IS NOT NULL), '') AS developers
FROM game g
LEFT JOIN game_genre     gg ON gg.game_id = g.id
LEFT JOIN genre          ge ON ge.id      = gg.genre_id
LEFT JOIN game_platform  gp ON gp.game_id = g.id
LEFT JOIN platform       p  ON p.id       = gp.platform_id
LEFT JOIN game_developer gd ON gd.game_id = g.id
LEFT JOIN developer      d  ON d.id       = gd.developer_id
GROUP BY g.id, g.game;`;

exports.getAllgames = async () => {
  const { rows } = await pool.query(getAllGamesQuery);
  return rows;
};

exports.addDev = async (devName) => {
  await pool.query("INSERT INTO developer (developer) VALUES($1)", [devName]);
};

exports.getAllDevs = async () => {
  const { rows } = await pool.query("select * from developer");
  return rows;
};

exports.addGenre = async (genreName) => {
  await pool.query("INSERT INTO genre (genre)VALUES($1)", [genreName]);
};

exports.getAllGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
};

exports.addGame = async (game, genres, devs) => {
  const client = await pool.connect();
  try {
    await client.query("begin");

    const { rows: gameRow } = await client.query(
      "INSERT into game (game) values($1) returning *",
      [game]
    );
    const devList = (
      await Promise.all(
        devs.map(async (dev) => {
          const { rows } = await client.query(
            "select * from developer WHERE developer = $1",
            [dev]
          );
          return rows;
        })
      )
    ).flat();
    const genreList = (
      await Promise.all(
        genres.map(async (genre) => {
          const { rows } = await client.query(
            "select * from genre WHERE genre = $1",
            [genre]
          );
          return rows;
        })
      )
    ).flat();
    await devList.forEach(async (dev) => {
      await client.query(
        "INSERT INTO game_developer (game_id,developer_id) VALUES($1,$2)",
        [gameRow[0].id, dev.id]
      );
    });
    await genreList.forEach(async (genre) => {
      await client.query(
        "INSERT INTO game_genre (game_id,genre_id) VALUES($1,$2)",
        [gameRow[0].id, genre.id]
      );
    });
    console.log("Game added! NO ERRORS (Hopefully)");
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.log("error happened when running add game query. ", err);
  } finally {
    client.release();
  }
};

exports.deleteGameQuery = async (id) => {
  await pool.query("DELETE FROM game WHERE id=$1", [id]);
};

// exports.addUser = async (name, date) => {
//   await pool.query("INSERT INTO users (username,post) VALUES($1,$2)", [
//     name,
//     date,
//   ]);
// };
