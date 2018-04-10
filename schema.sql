DROP DATABASE IF EXISTS podtalk;

CREATE DATABASE podtalk;

USE podtalk;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  password varchar(80) NOT NULL,
  PRIMARY KEY (id)
);

  -- title: podcast.title_original,
  -- maker: podcast.publisher_original,
  -- itunesID: podcast.itunes_id,
  -- LNID: podcast.id,
  -- showImage: podcast.image,
  -- latestRelease: podcast.lastest_pub_date_ms,
  -- genre: podcast.genres,
  -- descriptions: podcast.description_original,
  -- website: podcast.rss,

CREATE TABLE shows (
  id varchar(255) NOT NULL,
  itunesID varchar(100) NOT NULL,
  title varchar(100) NOT NULL,
  maker varchar(300) NOT NULL,
  show_image varchar(255),
  show_description varchar(1500),
  website varchar(255),
  latestRelease varchar(255),
  genre varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE episodes (
  id varchar(255) NOT NULL,
  show_id varchar(255) NOT NULL,
  episode_description varchar(1500),
  episode_url varchar(255),
  episode_length varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (show_id) REFERENCES shows (id)
);

CREATE TABLE comments (
  id int NOT NULL AUTO_INCREMENT,
  text varchar(500) NOT NULL,
  user_id int NOT NULL,
  episode_id varchar(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (episode_id) REFERENCES episodes (id)
);

CREATE TABLE shows_users (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  show_id varchar(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (show_id) REFERENCES shows (id)
);
