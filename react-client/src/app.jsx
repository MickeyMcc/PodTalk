import React from 'react';
import axios from 'axios';
import { Tabs, Tab } from 'material-ui/Tabs';
import ShowList from './components/ShowList';
import SearchList from './components/SearchList';
import Login from './components/Login';
import Signup from './components/Signup';
import ShowPage from './components/ShowPage';
import PopularPage from './components/PopularPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      shows: [],
      searchResults: [],
      userComments: {},
      loggedIn: false,
      activeShow: null,
      userMessage: 'Please login or signup!',
      activity: false,
      showIsOwned: false,
    };
    this.saveComment = this.saveComment.bind(this);
    this.addShow = this.addShow.bind(this);
    this.goHome = this.goHome.bind(this);
    this.logout = this.logout.bind(this);
    this.goToStatsPage = this.goToStatsPage.bind(this);
    this.makeShowActive = this.makeShowActive.bind(this);
    this.search = this.search.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      this.refreshShowList();
    }
  }

  // ///////////////// COMMENTS \\\\\\\\\\\\\\\\\\\\\\\\\\

  getUsersComments() {
    const context = this;
    console.log(context.state.user.id);
    axios.get('/comments', {
      params: {
        userID: context.state.user.id,
      },
    })
      .then((results) => {
        context.setState({ userComments: context.transformComments(results.data) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveComment(comment, showID) {
    const context = this;
    axios.post('/comments', {
      comment,
      showID,
      userID: context.state.user.id,
    })
      .then(() => {
        context.setState({ userMessage: 'comment saved' });
        context.getUsersComments();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  transformComments(comments) {
    const commentsObj = {};

    for (const comment of comments) {
      if (!commentsObj[comment.show_id]) {
        commentsObj[comment.show_id] = [comment.text];
      } else {
        commentsObj[comment.show_id].push(comment.text);
      }
    }
    return commentsObj;
  }

  // /////////////////USERS\\\\\\\\\\\\\\\\\\\\\\\\\\

  signup(username, password) {
    const context = this;
    axios({
      method: 'post',
      url: '/users',
      data: {
        user: username,
        password,
      },
    })
      .then((results) => {
        if (results.status === 204) {
          context.setState({ userMessage: 'Sorry, could not create that user. Try a different username' });
        } else {
          console.log(`WELCOME TO PODSTAR ${username}!`);
          context.setState({ user: results.data, loggedIn: true, userMessage: '' });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  login(username = 'new', password = 'user') {
    const context = this;
    axios({
      method: 'get',
      url: '/users',
      params: {
        user: username,
        password,
      },
    })
      .then((results) => {
        if (results.status === 204) {
          context.setState({ userMessage: 'Sorry, please check username-password combination' });
        } else {
          console.log(`WELCOME BACK ${results.data.username}!`);
          context.setState({ user: results.data, loggedIn: true, userMessage: '' });
          context.refreshShowList();
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  logout() {
    const context = this;
    axios({
      method: 'delete',
      url: '/users',
    })
      .then(() => {
        context.setState({ loggedIn: false });
        context.setState({
          user: { username: 'guest' },
          userMessage: 'Log out successful!',
          activeShow: null,
          activity: false,
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  // /////////////////SHOWS\\\\\\\\\\\\\\\\\\\\\\\\\\

  refreshShowList() {
    const context = this;
    axios.get('/shows', {
      params: {
        userId: context.state.user.id,
      },
    })
      .then((results) => {
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false,
          });
        } else {
          context.setState({
            shows: results.data,
          });
          context.getUsersComments();
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  addShow(show) {
    const context = this;
    axios.post('/shows', {
      userID: context.state.user.id,
      show, // from search results, doesn't have id
    })
      .then((results) => {
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false,
          });
        } else {
          context.setState({ userMessage: 'Show added!' });
          context.refreshShowList();
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  // /////////////////SEARCH\\\\\\\\\\\\\\\\\\\\\\\\\\

  search(query) {
    console.log('search', query);
    const context = this;
    axios.get('/search', {
      params: {
        terms: query,
      },
    })
      .then((results) => {
        console.log(results);
        if (results.statusCode === 404) {
          context.setState({
            loggedIn: false,
          });
        } else {
          context.setState({
            searchResults: results.data,
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  makeShowActive(show, showIsOwned) {
    this.setState({
      activeShow: show,
      userMessage: '',
      activity: false,
      showIsOwned,
    });
  }

  goToStatsPage() {
    this.setState({ activeShow: null, activity: true });
  }

  goHome() {
    this.setState({
      activeShow: null,
      userMessage: '',
      activity: false,
    });
  }

  // /////////////////RENDER\\\\\\\\\\\\\\\\\\\\\\\\\\

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <h1> PodTalk </h1>
          <Tabs>
            <Tab label="login">
              <Login login={this.login} />
            </Tab>
            <Tab label="create account">
              <Signup signup={this.signup} />
            </Tab>
          </Tabs>
        </div>
      );
    }

    const navbar = (
      <Tabs>
        <Tab label="Search">
          <SearchList
            results={this.state.searchResults}
            search={this.search}
            addShow={this.addShow}
            makeShowActive={this.makeShowActive}
          />
        </Tab>
        <Tab label="Your Shows">
          <ShowList
            shows={this.state.shows}
            comments={this.state.userComments}
            saveComment={this.saveComment}
            makeShowActive={this.makeShowActive}
          />
        </Tab>
        <Tab label="Stats">
          <ShowList
            shows={this.state.shows}
            comments={this.state.userComments}
            saveComment={this.saveComment}
            makeShowActive={this.makeShowActive}
          />
        </Tab>
      </Tabs>
    );

    // FOCUS VIEW
    if (this.state.activeShow) {
      const show = this.state.activeShow;
      return (
        <div>
          <h1 id="title" >PodTalk</h1>
          {navbar}
          <ShowPage
            show={show}
            saveComment={this.saveComment}
            owned={this.state.showIsOwned}
            addShow={this.addShow}
          />
        </div>
      );

    // STATS VIEW
    } else if (this.state.activity) {
      return (
        <div>
          <h1 id="title" >PodStar</h1>
          {navbar}
          <div>
            <PopularPage />
          </div>
        </div>
      );
    }

    return (<div>{navbar}</div>);
  }
}

export default App;
