var express = require('express');
var bodyParser = require('body-parser');

var db = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());

app.get('/shows', function (req, res) {
  console.log(req);
  console.log(req.body);
  const user = req.body.user;
  console.log('GET FOR SHOWS', user);
  db.selectAllShows(user, function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/shows', function (req, res) {


})


app.get('/search', function(req, res) {

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

