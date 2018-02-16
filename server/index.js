var express = require('express');
var bodyParser = require('body-parser');
var itunes = require('./itunesHelpers');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');

var db = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(session({
  secret: 'mickey mouse',
  cookie: {
    maxAge: 60000
  }
}));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const checkSession = function(req, res, next) {
  if (req.session.loggedIn === true) {
    next();
  } else {
    res.status(404).end(false);
  }
}

app.get('/shows', checkSession, function (req, res) {
  const user = req.query.user;
  console.log('GET FOR SHOWS', user);
  db.selectAllUserShows(user, function(err, data) {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).end(JSON.stringify(data));
    }
  });
});

app.post('/shows', function (req, res) {  //gets user and show
  const user = req.body.user;
  const show = req.body.show;
  db.addShowToUser(user, show, function(err, data) {
    if (err) {
      console.log(err);
      res.end('show could not be added');
    } else {
    res.end('show added to favorites');
    }
  });
})


app.get('/search', checkSession, function(req, res) {
  const query = req.query.terms;
  console.log(query, '<--------- my query');
  itunes.search(query, function(err, data) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(itunes.importantStuff(data));
    }
  });
});

app.get('/users', function(req, res) {
  console.log('login');
  const username = req.query.username;
  const password = req.query.password;
  db.createUser(username, password, function(err, data) {
    req.session.loggedIn = true;
    res.end();
  });

});

app.post('/users', function (req, res) {
  console.log('signup');
  const username = req.body.username;
  const password = req.body.password;
  db.createUser(username, password, function(err, data) {
    req.session.loggedIn = true;
    res.end();
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});