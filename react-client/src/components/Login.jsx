import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    };
    this.fieldEntry = this.fieldEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && !(!this.state.username || !this.state.password)) {
      this.handleSubmit();
    }
  }

  fieldEntry(event, key, target) {
    this.setState({ [target]: event.target.value });
  }

  handleSubmit() {
    this.setState({ usernameError: '', passwordError: '' });
    axios({
      method: 'get',
      url: '/users',
      params: {
        user: this.state.username,
        password: this.state.password,
      },
    })
      .then((results) => {
        this.props.setUser(results.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data === 'username') {
            this.setState({ usernameError: 'Username not recognized' });
          } else if (err.response.data === 'password') {
            this.setState({ passwordError: 'Bad password combo' });
          }
        } else {
          console.log('err', err);
        }
      });
  }

  render() {
    const errorStyle = {
      position: 'absolute',
      bottom: '-0.9rem',
    };
    return (
      <div>
        <TextField
          style={{ marginLeft: '10px' }}
          floatingLabelText="Username"
          value={this.state.username}
          onChange={event => this.fieldEntry(event, null, 'username')}
          errorText={this.state.usernameError}
          errorStyle={errorStyle}
        />
        <TextField
          style={{ marginLeft: '10px' }}
          floatingLabelText="Password"
          value={this.state.password}
          onChange={event => this.fieldEntry(event, null, 'password')}
          errorText={this.state.passwordError}
          errorStyle={errorStyle}
          onKeyUp={this.handleKeyPress}
        />
        <RaisedButton
          style={{ marginLeft: '10px' }}
          onClick={this.handleSubmit}
          label="Login"
          disabled={!this.state.username || !this.state.password}
        />
      </div>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
