const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS public.developer (
  id        integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  developer varchar(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.game (
  id   integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  game varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.genre (
  id    integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  genre varchar(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.platform (
  id       integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  platform varchar(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.game_developer (
  game_id      integer NOT NULL,
  developer_id integer NOT NULL,
  PRIMARY KEY (game_id, developer_id),
  FOREIGN KEY (game_id)      REFERENCES public.game(id)       ON DELETE CASCADE,
  FOREIGN KEY (developer_id) REFERENCES public.developer(id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.game_genre (
  game_id  integer NOT NULL,
  genre_id integer NOT NULL,
  PRIMARY KEY (game_id, genre_id),
  FOREIGN KEY (game_id)  REFERENCES public.game(id)   ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES public.genre(id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.game_platform (
  game_id     integer NOT NULL,
  platform_id integer NOT NULL,
  PRIMARY KEY (game_id, platform_id),
  FOREIGN KEY (game_id)     REFERENCES public.game(id)      ON DELETE CASCADE,
  FOREIGN KEY (platform_id) REFERENCES public.platform(id)  ON DELETE CASCADE
);
`;

const seedValues = `
  INSERT INTO developer (developer)
  VALUES 
    ('Valve'),
    ('FromSoftware'),
    ('CD Projekt Red')
  ON CONFLICT (developer) DO NOTHING;

  INSERT INTO game (game)
  VALUES 
    ('Half-Life'),
    ('Dark Souls'),
    ('Cyberpunk 2077')
  ON CONFLICT (game) DO NOTHING;

  INSERT INTO genre (genre)
  VALUES 
    ('Action'),
    ('RPG'),
    ('Shooter')
  ON CONFLICT (genre) DO NOTHING;

  INSERT INTO platform (platform)
  VALUES 
    ('PC'),
    ('PlayStation'),
    ('Xbox')
  ON CONFLICT (platform) DO NOTHING;

  -- relationships
  INSERT INTO game_developer (game_id, developer_id)
  VALUES 
    (1, 1),
    (2, 2),
    (3, 3)
  ON CONFLICT DO NOTHING;

  INSERT INTO game_genre (game_id, genre_id)
  VALUES 
    (1, 3),
    (2, 2),
    (3, 1)
  ON CONFLICT DO NOTHING;

  INSERT INTO game_platform (game_id, platform_id)
  VALUES 
    (1, 1),
    (2, 2),
    (3, 3)
  ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  if ((await client.query("select * from game")).rowCount == 0) {
    try {
      await client.query(seedValues);
    } catch {
      console.log(
        "Failed seeding values (values may already exist or be out of index)"
      );
    }
  }
  await client.end();
  console.log("DONE");
}
main();
