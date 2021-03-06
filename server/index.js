const express = require('express');
const bodyParser = require('body-parser');
const search = require('./itunesHelpers');
const session = require('express-session');
const path = require('path');

const db = require('../database-mysql');

const app = express();

app.use(express.static(path.join(__dirname, '/../react-client/dist')));
app.use(session({
  secret: 'mickey mouse',
  cookie: {
    maxAge: 6000000,
  },
}));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

// /////////////AUTHENTICATION\\\\\\\\\\\\\\\\\\\

const checkSession = (req, res, next) => {
  if (req.session.loggedIn === true) {
    next();
  } else {
    res.status(404).end('login');
  }
};

// /////////////////USERS\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/users', (req, res) => {
  const { user, password } = req.query;
  db.login(user, password, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      req.session.loggedIn = true;
      res.status(200).json({ username: user, id: data });
    }
  });
});

app.post('/users', (req, res) => {
  const { user, password } = req.body;
  db.createUser(user, password, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      req.session.loggedIn = true;
      res.status(201).json({ username: user, id: data.id });
    }
  });
});

app.delete('/users', (req, res) => {
  req.session.destroy(() => {
    res.status(200).end();
  });
});

// /////////////////SHOWS\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/shows', checkSession, (req, res) => {
  const user = req.query.userId;

  db.selectAllUserShows(user, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).end(JSON.stringify(data));
    }
  });
});

app.post('/shows', (req, res) => { // gets user and show
  const { userID, show } = req.body;
  db.addShowToUser(userID, show, (err) => {
    if (err) {
      res.end('show could not be added');
    } else {
      res.end('show added to favorites');
    }
  });
});

app.patch('/shows/remove', (req, res) => {
  const { userID, showID } = req.body;
  db.removeShowFromUser(userID, showID, () => {
    res.status(201).end();
  });
});

app.get('/episodes/user', (req, res) => {
  const { showID, userID } = req.query;
  db.getUserEpsForShow(userID, showID, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(data);
    }
  });
});

app.get('/episodes/recent', (req, res) => {
  const { showID, userID } = req.query;
  search.episodesForShow(showID, (err, rawEps) => {
    if (err) {
      res.status(500).send(err);
    } else {
      db.markOwnership(userID, showID, search.parseEpisodes(rawEps), (err2, eps) => {
        if (err) {
          res.status(500).send(err2);
        } else {
          res.status(201).json(eps);
        }
      });
    }
  });
});

app.post('/episodes/listen', (req, res) => {
  const { userID, episode, showID } = req.body;
  db.userEpisodeListen(userID, episode, showID, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).end();
    }
  });
});

// /////////////////SEARCH\\\\\\\\\\\\\\\\\\\\\\\\\\


app.get('/search', (req, res) => {
  const query = req.query.terms;

  search.searchListenNotes(query, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(search.parseShows(data.results));
    }
  });
});

// /////////////////COMMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\

app.post('/comments', (req, res) => {
  const { comment } = req.body;
  const user = req.body.userID;
  const show = req.body.showID;

  db.addComment(user, show, comment, (err) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(201).end();
    }
  });
});

app.get('/comments', (req, res) => {
  const user = req.query.userID;

  if (user === 'all') {
    db.getCommentsAll(req.query.showID, (err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.status(201).json(data);
      }
    });
  } else {
    db.getCommentsUser(user, (err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.status(201).json(data);
      }
    });
  }
});

// /////////////////ACTIVITY\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get('/activity', (req, res) => {
  function respond(err, data) {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).json(data);
    }
  }

  const entity = req.query.type;

  if (entity === 'users') {
    db.getUserActivity(respond);
  } else if (entity === 'shows') {
    db.getShowActivity(respond);
  } else {
    res.status(400).end();
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port!');
});
