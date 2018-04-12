import React from 'react';
import axios from 'axios';
import { Tabs, Tab } from 'material-ui/Tabs';
import ShowList from './components/ShowList';
import Login from './components/Login';
import Signup from './components/Signup';

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
      activity: false,
      showIsOwned: false,
    };
    this.saveComment = this.saveComment.bind(this);
    this.addShow = this.addShow.bind(this);
    this.goHome = this.goHome.bind(this);
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.setUser = this.setUser.bind(this);
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

  setUser(userObj) {
    this.setState({ user: userObj, loggedIn: true, userMessage: '' });
    this.refreshShowList();
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
          <img style={{ width: '96%', maxWidth: '400px', marginLeft: '2%', marginRight: '2%' }} src="./images/logo.png" alt="" />
          <Tabs>
            <Tab label="login">
              <Login setUser={this.setUser} />
            </Tab>
            <Tab label="create account">
              <Signup setUser={this.setUser} />
            </Tab>
          </Tabs>
        </div>
      );
    }

    const navbar = (
      <Tabs>
        <Tab label="Your Feed">
          <ShowList
            shows={this.state.shows}
            comments={this.state.userComments}
            saveComment={this.saveComment}
            makeShowActive={this.makeShowActive}
          />
        </Tab>
        <Tab label="World Feed">
          <ShowList
            shows={this.state.shows}
            comments={this.state.userComments}
            saveComment={this.saveComment}
            makeShowActive={this.makeShowActive}
          />
        </Tab>
      </Tabs>
    );

    return (
      <div>
        <img
          style={{
            width: '96%',
            maxWidth: '400px',
            marginLeft: '2%',
            marginRight: '2%',
          }}
          src="./images/logo.png"
          alt=""
        />
        {navbar}
      </div>
    );
  }
}

export default App;
