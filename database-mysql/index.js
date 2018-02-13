var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'podstar'
});

var selectAllShows = function(callback) {
  connection.query('SELECT * FROM shows', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAllShows = selectAllShows;
