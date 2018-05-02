import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
    this.usernameCheck = this.usernameCheck.bind(this);
    this.password2Check = this.password2Check.bind(this);
    this.fieldEntry = this.fieldEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && !(this.state.mismatch || this.state.shortUser || !this.state.username || !this.state.password || !this.state.password2)) {
      this.handleSubmit();
    }
  }

  fieldEntry(event, key, target) {
    this.setState({ [target]: event.target.value });
    if (this[`${target}Check`]) {
      this[`${target}Check`](event.target.value);
    }
  }

  password2Check(newValue) {
    if (this.state.password !== newValue) {
      this.setState({ mismatch: true });
    } else {
      this.setState({ mismatch: false });
    }
  }

  usernameCheck(newValue) {
    if (newValue.length < 4) {
      this.setState({ shortUser: true });
    } else {
      this.setState({ shortUser: false });
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

  writeError() {
    if (this.state.shortUser) {
      return 'Username must be at least 4 chars';
    }
    if (this.state.usernameInUse) {
      return 'Username already in use!';
    }
    return '';
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
            onChange={event => this.fieldEntry(event, null, 'username')}
            errorText={this.writeError()}
            errorStyle={errorStyle}
            onKeyPress={this.handleKeyPress}
          />
          <TextField
            style={{ marginLeft: '10px' }}
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={event => this.fieldEntry(event, null, 'password')}
            onKeyPress={this.handleKeyPress}
          />
          <TextField
            style={{ marginLeft: '10px' }}
            floatingLabelText="Password Again"
            type="password"
            value={this.state.password2}
            onChange={event => this.fieldEntry(event, null, 'password2')}
            errorText={this.state.mismatch ? 'Passwords do not match' : ''}
            errorStyle={errorStyle}
            onKeyPress={this.handleKeyPress}
          />
          <RaisedButton
            style={{ marginLeft: '10px' }}
            onClick={this.handleSubmit}
            label="Create"
            disabled={this.state.mismatch || this.state.shortUser || !this.state.username
              || !this.state.password || !this.state.password2}
          />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Signup;
