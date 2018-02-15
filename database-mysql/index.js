var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'podstar'
});

module.exports.selectAllShows = function(user, callback) {

  var sql = `SELECT itunesID FROM shows, users, shows_users WHERE '${user}' = users.username AND shows_users.user_id = users.id AND shows_users.show_id = shows.id`;

  connection.query(sql, function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.addShow = function (user, showID, callback) {
  var sql = `INSERT INTO shows_users (user_id, show_id) VALUES ((SELECT id FROM users WHERE username = ${user}), SELECT id FROM shows WHERE itunesID = ${showID})`;

  connection.query(sql, function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })

}

