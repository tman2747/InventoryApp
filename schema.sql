
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
