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
    maxAge: 6000000
  }
}));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

///////////////AUTHENTICATION\\\\\\\\\\\\\\\\\\\

const checkSession = function(req, res, next) {
  
  if (req.session.loggedIn === true) {
    next();
  } else {
    console.log('badCookies');
    res.status(404).json({loggedIn: false});
  }
}

///////////////////USERS\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/users', function(req, res) {
  
  const user = req.query.user;
  const password = req.query.password;
  
  db.login(user, password, function(err, data) {
    if (err) {
      res.status(400).json({message: err});
    } else {
      req.session.loggedIn = true;
      res.status(200).json({username: user, id: data});
    }
  });
});

app.post('/users', function (req, res) {
  
  const user = req.body.user;
  const password = req.body.password;
  
  db.createUser(user, password, function(err, data) {
    if (err) {
      res.status(400).json({message: err});
    } else {
      req.session.loggedIn = true;
      res.status(201).json({username: user, id: data.insertId});
    }
  });
});

app.delete('/users', function (req, res) {
  
  res.session.destroy( function() {
    res.status(200).end();
  });
})


///////////////////SHOWS\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/shows', checkSession, function (req, res) {
  
  const user = req.query.userId;
  
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
  
  const userId = req.body.userId;
  const show = req.body.show;

  db.addShowToUser(userId, show, function(err, data) {
    if (err) {
      console.log(err);
      res.end('show could not be added');
    } else {
    res.end('show added to favorites');
    }
  });
})

///////////////////SEARCH\\\\\\\\\\\\\\\\\\\\\\\\\\


app.get('/search', checkSession, function(req, res) {

  const query = req.query.terms;

  itunes.search(query, function(err, data) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(itunes.importantStuff(data));
    }
  });
});

///////////////////COMMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\

app.post('/comments', function(req, res) {

  const comment = req.body.comment;
  const user = req.body.userID;
  const show = req.body.showID;

  console.log(`add ${comment} to ${show} by ${user}`);

  db.addComment(user, show, comment, function(err, data) {
    if (err) {
      res.status(500).json({message: err});
    } else {
      console.log(data);
      res.status(201).end();
    }
  });
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});