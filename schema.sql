DROP DATABASE IF EXISTS podstar;

CREATE DATABASE podstar;

USE podstar;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  password varchar(80) NOT NULL,
  PRIMARY KEY (ID)
);

      -- title : podcast.trackName,
      -- maker : podcast.artistName,
      -- itunesUrl : podcast.collectionViewUrl,
      -- littleImg : podcast.artworkUrl30,
      -- bigImg : podcast.artworkUrl60,
      -- latestRelease : podcast.releaseDate,
      -- trackCount : podcast.trackCount,
      -- genre : podcast.primaryGenreName

CREATE TABLE shows (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  maker varchar(300) NOT NULL,
  itunesUrl varchar(200) NOT NULL,
  littleImg varchar(200) NOT NULL,
  bigImg varchar(200) NOT NULL,
  latestRelease varchar(60) NOT NULL,  -- Kind of a data but i don't want to format it
  trackCount INTEGER NOT NULL,
  genre varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE comments (
  id int NOT NULL AUTO_INCREMENT,
  text varchar(500) NOT NULL,
  user_id INT NOT NULL,
  show_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (show_id) REFERENCES shows (id)
);

CREATE TABLE shows_users (
  id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  show_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (show_id) REFERENCES shows (id)
);

/*
 * SOME SAMPLE STARTER DATA
*/

INSERT INTO users (username, password) VALUES ('test', 'test');


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- // {
-- //   "title": "Reply All",
-- //     "maker": "Gimlet",
-- //       "itunesUrl": "https://itunes.apple.com/us/podcast/reply-all/id941907967?mt=2&uo=4",
-- //         "littleImg": "http://is1.mzstatic.com/image/thumb/Music128/v4/22/0d/f6/220df688-843f-264a-b67e-28644b73c129/source/30x30bb.jpg",
-- //           "bigImg": "http://is1.mzstatic.com/image/thumb/Music128/v4/22/0d/f6/220df688-843f-264a-b67e-28644b73c129/source/60x60bb.jpg",
-- //             "latestRelease": "2018-02-15T11:00:00Z",
-- //               "trackCount": 135,
-- //                 "genre": "Technology"
-- // },