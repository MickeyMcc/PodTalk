import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.userNameEntry = this.userNameEntry.bind(this);
    this.passwordEntry = this.passwordEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  userNameEntry(event) {
    this.setState({ username: event.target.value });
  }

  passwordEntry(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <div>
          <h3>Log In</h3>
          <h5>Username</h5>
          <input
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.userNameEntry}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.passwordEntry}
          />
          <br />
          <RaisedButton onClick={this.handleSubmit} Login="Default" />
        </div>
      </div>
    );
  }
}

export default Login;
