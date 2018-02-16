var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'podstar'
});

//Factored out here to for less repetition
const standardDBCall = function(query, callback) {
  connection.query(query, function(err, data) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(err, data)
    }
  }); 
};

///////////////////USERS\\\\\\\\\\\\\\\\\\\\\\\\\\

module.exports.createUser = function(username, password, callback) {
  const checkForExisting = `SELECT id FROM users WHERE username = '${username}'`;
  connection.query(checkForExisting, function(err, data) {
    if (err) {
      callback(err);
    } else {
      if (data.length !== 0) {
        callback('ERROR ON USER CREATION: username taken!');
      } else {
        insertUser(function(err, data) {
          if (err) {
            callback(err);
          } else {
            console.log(data);
            callback(null, data)
          }
        });
      }
    }
  });

  function insertUser(callback) {
    const insertQuery = `INSERT INTO USERS (username, password) VALUES ('${username}', '${bcrypt.hashSync(password)}')`;

    standardDBCall(insertQuery, callback);
  }

};

module.exports.login = function(username, password, callback) {
  const query = `SELECT id, password FROM users WHERE username = '${username}'`;

  connection.query(query, function(err, data) {
    if (err) {
      callback(err);
    } else {
      if (data.length === 0) {
        callback('ERROR: username does not exist');
      } else {
        if (bcrypt.compareSync(password, data[0].password)) {
          callback(null, data[0].id);
        } else {
          callback('ERROR: username and password do not match');
        }
      }
    }
  });

  function insertUser(callback) {
    const insertQuery = `INSERT INTO USERS (username, password) VALUES ('${username}', '${bcrypt.hashSync(password)}')`;

    standardDBCall(insertQuery, callback);
  }

};

module.exports.login = function(username, password, callback) {
  const query = `SELECT id, password FROM users WHERE username = '${username}'`;
  console.log(query);
  connection.query(query, function(err, data) {
    if (err) {
      callback(err);
    } else {
      if (data.length === 0) {
        callback('ERROR: username does not exist');
      } else {
        if (bcrypt.compareSync(password, data[0].password)) {
          callback(null, data[0].id);
        } else {
          callback('ERROR: username and password do not match');
        }
      }
    }
  });
};

///////////////////SHOWS\\\\\\\\\\\\\\\\\\\\\\\\\\

module.exports.selectAllUserShows = function (user, callback) {

  var showsForUser = "SELECT shows.* FROM shows " +
    "INNER JOIN shows_users ON shows.id = shows_users.show_id " +
    `WHERE '${user}' = shows_users.user_id`;

  standardDBCall(showsForUser, callback);
};

//WELCOME TO HELL
module.exports.addShowToUser = function (user, show, callback) {
  checkDBForShow(show, function (err, showFound) { //checks if some user has already added the show
    if (err) {
      callback(err);
    } else {
      if (!showFound) { //show has never been added to db
        console.log('show not found in database, adding', show.title, 'now!');
        addShow(show, function (err) { //add show to db
          if (err) {
            callback(err);
          } else {
            makeConection(callback); //make user-show connection
          }
        });
      } else {
        checkForConnection(user, show, function (err, connFound) {
          if (err) {
            callback(err);
          } else {
            if (!connFound) {
              makeConection(callback);
            }
          }
        });
      }
    }
  });

  function makeConection() {

    const connectShowUser = "INSERT INTO shows_users (user_id, show_id) " +
      `VALUES (${user}, ` +
      `(SELECT id FROM shows WHERE title = '${show.title}'))`;

    standardDBCall(connectShowUser, callback);
  }
};

const checkDBForShow = function (show, callback) {

  const checkForShow = `SELECT id FROM shows WHERE '${show.title}' = title`;

  connection.query(checkForShow, function (err, data) {
    if (err) {
      callback(err)
    } else {
      if (data.length === 0) {
        callback(err, false);
      } else {
        callback(err, true);
      }
    }
  });
};


const addShow = function (show, callback) {
  var query = "INSERT INTO shows " +
    "(title, maker, itunesUrl, littleImg, bigImg, latestRelease, trackCount, genre) " +
    `VALUES ('${show.title}','${show.maker}','${show.itunesUrl}','${show.littleImg}','${show.bigImg}','${show.latestRelease}','${show.trackCount}','${show.genre}')`;

  standardDBCall(query, callback);

};


const checkForConnection = function(user, show, callback) {

    const checkConnection = "SELECT shows_users.id FROM shows_users " + 
      "INNER JOIN shows ON shows.id = shows_users.show_id " + 
      `WHERE shows_users.user_id = ${user} AND shows.title = '${show.title}'`;
  
    connection.query(checkConnection, function (err, data) {
      if (err) {
        callback(err);
      } else {
        if (data.length === 0) {
          callback(err, false);
        } else {
          callback(err, true);
        }
      }
    });
};

///////////////////COMMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\


module.exports.addComment = function(userID, showID, comment, callback) {
  
  const query = "INSERT INTO comments (user_id, show_id, text) " +
    `VALUES ('${userID}', '${showID}', '${comment}')`;

  standardDBCall(query, callback);
};

module.exports.getCommentsUser = function(userID, showID, callback) {
  const query = "SELECT comments.text, users.username FROM comments " +
    "INNER JOIN users ON users.id = comments.user_id " +
    `WHERE '${showID}' = comments.show_id`;

  standardDBCall(query, callback);
};

module.exports.getCommentsAll = function(showID, callback) {
  const query = "SELECT comments.text, users.username FROM comments " +
    "INNER JOIN users ON users.id = comments.user_id " +
    `WHERE '${showID}' = comments.show_id`;

  standardDBCall(query, callback);
};


/////DATA STRUCTURE FOR SHOWS
/*
{
  "title": "Reply All",
  "maker": "Gimlet",
  "itunesUrl": "https://itunes.apple.com/us/podcast/reply-all/id941907967?mt=2&uo=4",
  "littleImg": "http://is1.mzstatic.com/image/thumb/Music128/v4/22/0d/f6/220df688-843f-264a-b67e-28644b73c129/source/30x30bb.jpg",
  "bigImg": "http://is1.mzstatic.com/image/thumb/Music128/v4/22/0d/f6/220df688-843f-264a-b67e-28644b73c129/source/60x60bb.jpg",
  "latestRelease": "2018-02-15T11:00:00Z",
  "trackCount": 135,
  "genre": "Technology"
}
*/