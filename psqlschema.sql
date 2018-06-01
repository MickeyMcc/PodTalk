DROP SCHEMA podtalk CASCADE;

CREATE SCHEMA podtalk;

CREATE TABLE podtalk.users
(
    id SERIAL,
    username varchar (20) NOT NULL,
    password varchar (80) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE podtalk.shows
(
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

CREATE TABLE podtalk.episodes
(
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

CREATE TABLE podtalk.comments
(
    id SERIAL PRIMARY KEY,
    text varchar (500) NOT NULL,
    user_id int NOT NULL,
    show_id varchar (255),
    episode_id varchar (255),
    comment_id int NULL, 
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (episode_id) REFERENCES episodes (id),
    FOREIGN KEY (show_id) REFERENCES shows (id)
);

CREATE TABLE podtalk.shows_users
(
    id SERIAL,
    user_id int NOT NULL,
    show_id varchar (255) NOT NULL,
    addDate timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (show_id) REFERENCES shows (id)
);

CREATE TABLE podtalk.episodes_users
(
    id SERIAL,
    user_id int NOT NULL,
    episode_id varchar (255) NOT NULL,
    listened BOOLEAN DEFAULT false,
    commented BOOLEAN DEFAULT false,
    addDate timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (episode_id) REFERENCES episodes (id)
);
