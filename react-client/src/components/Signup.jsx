import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      mismatch: false,
      shortUser: false,
      usernameInUse: false,
    };
    this.userNameEntry = this.userNameEntry.bind(this);
    this.passwordEntry = this.passwordEntry.bind(this);
    this.password2Entry = this.password2Entry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key == 'Enter' && !(this.state.mismatch || this.state.shortUser || !this.state.username || !this.state.password || !this.state.password2)) {
      this.handleSubmit();
    }
  }

  userNameEntry(event) {
    this.setState({ username: event.target.value });
    if (event.target.value.length < 4) {
      this.setState({ shortUser: true });
    } else {
      this.setState({ shortUser: false });
    }
  }

  passwordEntry(event) {
    this.setState({ password: event.target.value });
  }

  password2Entry(event) {
    this.setState({ password2: event.target.value });
    if (this.state.password !== event.target.value) {
      this.setState({ mismatch: true });
    } else {
      this.setState({ mismatch: false });
    }
  }

  handleSubmit() {
    axios({
      method: 'post',
      url: '/users',
      data: {
        user: this.state.username,
        password: this.state.password,
      },
    })
      .then((results) => {
        this.props.setUser(results.data);
      })
      .catch((err) => {
        if (err.response && err.response.data === 'username') {
          this.setState({ usernameInUse: true });
        }
        console.log('err', err);
      });
  }

  render() {
    const errorStyle = {
      position: 'absolute',
      bottom: '-0.9rem',
    };

    return (
      <div>
        <div>
          <TextField
            style={{ marginLeft: '10px' }}
            floatingLabelText="Username"
            value={this.state.username}
            onChange={this.userNameEntry}
            errorText={this.state.shortUser ? 'Username must be at least 4 chars' : (this.state.usernameInUse ? 'Username already in use!' : '')}
            errorStyle={errorStyle}
          />
          <TextField
            style={{ marginLeft: '10px' }}
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={this.passwordEntry}
          />
          <TextField
            style={{ marginLeft: '10px' }}
            floatingLabelText="Password Again"
            type="password"
            value={this.state.password2}
            onChange={this.password2Entry}
            errorText={this.state.mismatch ? 'Passwords do not match' : ''}
            errorStyle={errorStyle}
            onKeyPress={this.handleKeyPress}
          />
          <RaisedButton
            style={{ marginLeft: '10px' }}
            onClick={this.handleSubmit}
            label="Create"
            disabled={this.state.mismatch || this.state.shortUser || !this.state.username || !this.state.password || !this.state.password2}
          />
        </div>
      </div>
    );
  }
}

export default Signup;
