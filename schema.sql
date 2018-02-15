DROP DATABASE IF EXISTS podstar;

CREATE DATABASE podstar;

USE podstar;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  password varchar(20) NOT NULL,
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
  title varchar(40) NOT NULL,
  maker varchar(40) NOT NULL,
  itunesUrl varchar(60) NOT NULL,
  littleImg varchar(60) NOT NULL,
  bigImg varchar(60) NOT NULL,
  latestRelease varchar(40) NOT NULL,  -- Kind of a data but i don't want to format it
  trackCount INTEGER NOT NULL,
  genre varchar(20) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE comments (
  id int NOT NULL AUTO_INCREMENT,
  text varchar(300) NOT NULL,
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

INSERT INTO shows (title, maker, itunesUrl, littleImg, bigImg, latestRelease, trackCount, genre)
  VALUES ('reply all','gimlet','url','lilthumb','bigthumb','last release',123,'awesomeness');
INSERT INTO users (username, password) VALUES ('test', 'test');
INSERT INTO comments (text, user_id, show_id) VALUES ('I liked this', 1, 1);
INSERT INTO shows_users (user_id, show_id) VALUES (1,1);

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