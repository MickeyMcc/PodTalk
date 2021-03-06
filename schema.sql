DROP DATABASE IF EXISTS podtalk;

CREATE DATABASE podtalk;

USE podtalk;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  password varchar(80) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE shows (
  id varchar(255) NOT NULL,
  itunesID varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  maker varchar(255) NOT NULL,
  show_image varchar(255),
  show_description varchar(2500),
  website varchar(550),
  latestRelease varchar(255),
  genre varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE episodes (
  id varchar(255) NOT NULL,
  show_id varchar(560),
  title varchar(255),
  description varchar(2500),
  url varchar(550),
  audioLength varchar(255),
  pubDate bigint,
  PRIMARY KEY (id),
  FOREIGN KEY (show_id) REFERENCES shows (id)
);

CREATE TABLE comments (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  text varchar(500) NOT NULL,
  user_id int NOT NULL,
  show_id varchar(255),
  episode_id varchar(255),
  comment_id int NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (episode_id) REFERENCES episodes (id),
  FOREIGN KEY (show_id) REFERENCES shows (id),
  FOREIGN KEY (comment_id) REFERENCES comments (id)
);

CREATE TABLE shows_users (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  show_id varchar(255) NOT NULL,
  addDate datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (show_id) REFERENCES shows (id)
);

CREATE TABLE episodes_users (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  episode_id varchar(255) NOT NULL,
  listened BOOLEAN DEFAULT 0,
  commented BOOLEAN DEFAULT 0,
  addDate datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (episode_id) REFERENCES episodes (id)
);

INSERT INTO shows (id, itunesID, title, maker, show_image, show_description, website, latestRelease, genre) VALUES
('f11c5d2586c245edac2c94314a45a885', '121493804', "Wait Wait... Don't Tell Me!", "NPR", "https://d3sv2eduhewoas.cloudfront.net/channel/image/c10e4e2f4112490a83f13e060b816095.jpg", "NPR's weekly current events quiz. Have a laugh and test your news knowledge while figuring out what's real and what we've made up.", "https://www.npr.org/rss/podcast.php?id=344098539", "2 days ago", '[82,133]');
