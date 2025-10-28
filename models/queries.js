const pool = require("./pool");

exports.getAllgames = async () => {
  const { rows } = await pool.query(`SELECT
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
GROUP BY g.id, g.game;`);
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



// exports.addUser = async (name, date) => {
//   await pool.query("INSERT INTO users (username,post) VALUES($1,$2)", [
//     name,
//     date,
//   ]);
// };
