import React from 'react';

class Signup extends React.Component {
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
    console.log('submit', this.state.username, this.state.password);
    this.props.signup(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <div>
          <h3>Sign Up</h3>
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
          <button onClick={this.handleSubmit}>
            Sign Me Up
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
