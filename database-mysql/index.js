// const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const { Client } = require('pg');

console.log(process.env);

const connection = new Client({
  connectionString: process.env.DATABASE_URL,
});

connection.connect();

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'podtalk',
// });

// Factored out here to for less repetition
const standardDBCall = (query, callback) => {
  connection.query(query, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, data);
    }
  });
};

const cleanQuotes = (string) => {
  const resingle = /'/gi;
  const redouble = /"/gi;
  const single = string.replace(resingle, '\'\'');
  const double = single.replace(redouble, '""');
  return double;
};

// /////////////////USERS\\\\\\\\\\\\\\\\\\\\\\\\\\

module.exports.createUser = (username, password, callback) => {
  const checkForExisting = `SELECT id FROM users WHERE username = '${username}'`;
  connection.query(checkForExisting, (err, data) => {
    if (err) {
      callback(err);
    } else if (data.length) {
      callback('username');
    } else {
      const insertQuery = `INSERT INTO USERS (username, password) VALUES ('${username}', '${bcrypt.hashSync(password)}')`;
      standardDBCall(insertQuery, callback);
    }
  });
};

module.exports.login = (username, password, callback) => {
  const query = `SELECT id, password FROM users WHERE username = '${username}'`;

  connection.query(query, (err, data) => {
    if (err) {
      callback(err);
    } else if (!data.length) {
      callback('username');
    } else if (bcrypt.compareSync(password, data[0].password)) {
      callback(null, data[0].id);
    } else {
      callback('password');
    }
  });
};

// /////////////////SHOWS\\\\\\\\\\\\\\\\\\\\\\\\\\

module.exports.selectAllUserShows = (user, callback) => {
  // all shows that a user has connected with
  const showsForUser = 'SELECT shows.* FROM shows ' +
    'INNER JOIN shows_users ON shows.id = shows_users.show_id ' +
    `WHERE '${user}' = shows_users.user_id`;

  standardDBCall(showsForUser, callback);
};

function checkDBForShow(show, callback) {
  // check for show in db by title
  const checkForShow = `SELECT id FROM shows WHERE '${show.id}' = id`;

  connection.query(checkForShow, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, !!data.length);
    }
  });
}

function addShow(show, callback) {
  // add show from search data
  const query = 'INSERT INTO shows ' +
    '(id, itunesID, title, maker, show_image, show_description, website, latestRelease, genre) ' +
    `VALUES ('${show.id}','${show.itunesID}', '${cleanQuotes(show.title)}', '${cleanQuotes(show.maker)}', '${show.image}', ` +
    `'${cleanQuotes(show.description)}', '${show.website}', '${show.latestRelease}', '${JSON.stringify(show.genre)}')`;

  standardDBCall(query, callback);
}

function checkForConnection(user, show, callback) {
  // show user entry on intersection table
  const checkConnection = 'SELECT shows_users.id FROM shows_users ' +
    'INNER JOIN shows ON shows.id = shows_users.show_id ' +
    `WHERE shows_users.user_id = ${user} AND shows.id = '${show.id}'`;

  connection.query(checkConnection, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, !!data.length); // coerce to bool
    }
  });
}

// WELCOME TO HELL
module.exports.addShowToUser = (user, show, callback) => {
  function makeConection() {
    // add show - user to intersection table
    const connectShowUser = 'INSERT INTO shows_users (user_id, show_id) ' +
      `VALUES (${user}, '${show.id}')`;
    standardDBCall(connectShowUser, callback);
  }
  // makes connection between user and show. adds show to database if needed
  // doesn't make duplicate connections
  checkDBForShow(show, (err, showFound) => {
    if (err) {
      callback(err);
    } else if (!showFound) {
      // show has never been added to db
      addShow(show, (err2) => {
        if (err2) {
          console.log('err!', err2);
          callback(err2);
        } else {
          // make user-show connection
          makeConection(callback);
        }
      });
    } else {
      checkForConnection(user, show, (err3, connFound) => {
        if (err3) {
          callback(err3);
        } else if (!connFound) {
          makeConection(callback);
        }
      });
    }
  });
};

module.exports.removeShowFromUser = (userID, showID, callback) => {
  const query = `DELETE FROM shows_users WHERE user_id='${userID}' AND show_id = '${showID}'`;
  standardDBCall(query, callback);
};

// ////////////////////EPISODES\\\\\\\\\\\\\\\\\\\\\\\\\\

const getUserEpsForShow = (userID, showID, callback) => {
  // find episodes the user has mark listened or commented on
  const getEps = 'SELECT * FROM episodes_users INNER JOIN episodes ON episodes.id = ' +
    `episodes_users.episode_id WHERE episodes.show_id = '${showID}' AND episodes_users.user_id = ${userID} ` +
    'AND (episodes_users.listened OR episodes_users.commented) ORDER BY episodes.pubDate DESC;';

  standardDBCall(getEps, callback);
};
module.exports.getUserEpsForShow = getUserEpsForShow;

module.exports.markOwnership = (userID, showID, searchEpList, callback) => {
  const targetEps = searchEpList.slice();
  getUserEpsForShow(userID, showID, (err, ownedEps) => {
    let targetEpsIndex = 0;
    let ownedEpsIndex = 0;
    // they are both sorted descending by publish date
    // 1s and 0s instead of true/false to match sequel syntax;
    while (targetEpsIndex < targetEps.length && ownedEpsIndex < ownedEps.length) {
      if (targetEps[targetEpsIndex].id === ownedEps[ownedEpsIndex].id) {
        targetEps[targetEpsIndex].listened = 1;
        ownedEpsIndex += 1;
        targetEpsIndex += 1;
      } else if (targetEps[targetEpsIndex].pubDate > ownedEps[ownedEpsIndex].pubDate) {
        targetEps[targetEpsIndex].listened = 0;
        targetEpsIndex += 1;
      } else {
        ownedEpsIndex += 1;
      }
    }
    // fill in the rest of the falses at end of array
    for (targetEpsIndex; targetEpsIndex < targetEps.length; targetEpsIndex += 1) {
      targetEps[targetEpsIndex].listened = 0;
    }

    callback(err, targetEps);
  });
};

module.exports.userEpisodeListen = (userID, episode, showID, callback) => {
  const episodeID = episode.id;
  const markListened = 'UPDATE episodes_users SET listened = !listened WHERE user_id = ' +
    `${userID} AND episode_id = '${episodeID}';`;

  const makeConnEntry = 'INSERT INTO episodes_users (user_id, episode_id, listened) VALUES ' +
    `('${userID}', '${episodeID}', 1);`;

  const check4conn = `SELECT id from episodes_users WHERE user_id = ${userID} AND episode_id = '${episodeID}';`;

  const check4epp = `SELECT id FROM episodes WHERE id = '${episodeID}';`;

  const insertEpp = 'INSERT INTO episodes (id, show_id, title, description, url, audioLength, pubDate) ' +
    `VALUES ('${episodeID}', '${showID}', '${cleanQuotes(episode.title)}', '${cleanQuotes(episode.description)}', '${episode.audio}', '${episode.audioLength}', ${episode.pubDate})`;

  connection.query(check4epp, (err, res) => {
    if (err) {
      callback(err);
    } else if (!res.length) { // episode is not yet in database
      connection.query(insertEpp, (err1) => { // add epp
        if (err1) {
          callback(err1);
        } else {
          connection.query(makeConnEntry, (err2, data) => { // add user
            callback(err2, data);
          });
        }
      });
    } else { // episode in database
      connection.query(check4conn, (err1, data) => { // see if there is already a relationship
        if (err1) {
          callback(err1);
        } else if (data.length) { // user already owns episode
          connection.query(markListened, (err2, data1) => {
            callback(err2, data1);
          });
        } else { // user does not own episode, make entry
          connection.query(makeConnEntry, (err3, data2) => {
            callback(err3, data2);
          });
        }
      });
    }
  });
};

// /////////////////COMMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\

module.exports.addComment = (userID, episodeID, comment, callback) => {
  // add a comment by a user to a show
  const query = 'INSERT INTO comments (user_id, episode_id, text) ' +
    `VALUES ('${userID}', '${episodeID}', '${comment}')`;

  standardDBCall(query, callback);
};

module.exports.getCommentsUser = (userID, callback) => {
  // all comments by a user
  const query = 'SELECT * FROM comments ' +
    `WHERE ${userID} = comments.user_id;`;

  standardDBCall(query, callback);
};

module.exports.getCommentsAll = (episodeID, callback) => {
  // all comments on a show
  const query = 'SELECT comments.text, users.username FROM comments ' +
  'INNER JOIN users ON users.id = comments.user_id ' +
  `WHERE comments.episode_id = ${episodeID};`;

  standardDBCall(query, callback);
};

// /////////////////POPULARITY\\\\\\\\\\\\\\\\\\\\\\\\\\
// function synthesizeUsers(comments, shows) {
//   const userActivity = {};
//   for (const show of shows) {
//     if (!userActivity[show.username]) {
//       userActivity[show.username] = { connections: 0, comments: 0 };
//     }
//     userActivity[show.username].connections++;
//   }
//   for (const comment of comments) {
//     if (!userActivity[comment.username]) {
//       userActivity[comment.username] = { connections: 0, comments: 0 };
//     }
//     userActivity[comment.username].comments++;
//   }
//   return userActivity;
// }

// function synthesizeShows(comments, connections) {
//   const showActivity = {};
//   for (const connection of connections) {
//     if (!showActivity[connection.title]) {
//       showActivity[connection.title] = { connections: 0, comments: 0 };
//     }
//     showActivity[connection.title].connections++;
//   }
//   for (const comment of comments) {
//     if (!showActivity[comment.title]) {
//       showActivity[comment.title] = { connections: 0, comments: 0 };
//     }
//     showActivity[comment.title].comments++;
//   }
//   return showActivity;
// }

// module.exports.getUserActivity = (callback) => {
//   const getComments = 'SELECT users.username, comments.id AS "comments" FROM users INNER JOIN comments ON users.id = comments.user_id;';

//   connection.query(getComments, (err, data) => {
//     if (err) {
//       callback(err);
//     } else {
//       const comments = data;
//       const showConnections = 'SELECT users.username, shows_users.id AS "shows" FROM users INNER JOIN shows_users ON users.id = shows_users.user_id;';

//       connection.query(showConnections, (err2, data) => {
//         if (err2) {
//           console.log('err');
//           callback(err2);
//         } else {
//           const shows = data;
//           const processedData = synthesizeUsers(comments, shows);
//           callback(null, processedData);
//         }
//       });
//     }
//   });
// };

// module.exports.getShowActivity = (callback) => {
//   const getComments = 'SELECT shows.title, comments.id AS "comments" FROM shows LEFT OUTER JOIN comments ON shows.id = comments.show_id;';

//   connection.query(getComments, (err, data) => {
//     if (err) {
//       callback(err);
//     } else {
//       const comments = data;

//       const showConnections = 'SELECT shows.title, shows.id AS "shows" FROM shows LEFT OUTER JOIN shows_users ON shows.id = shows_users.show_id;';

//       connection.query(showConnections, (err, data) => {
//         if (err) {
//           callback(err);
//         } else {
//           const connections = data;
//           const processedData = synthesizeShows(comments, connections);
//           callback(null, processedData);
//         }
//       });
//     }
//   });
// };

