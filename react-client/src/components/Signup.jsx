import React from 'react';
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
    };
    this.userNameEntry = this.userNameEntry.bind(this);
    this.passwordEntry = this.passwordEntry.bind(this);
    this.password2Entry = this.password2Entry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log('submit', this.state.username, this.state.password);
    this.props.signup(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            style={{ marginLeft: '10px' }}
            floatingLabelText="Username"
            value={this.state.username}
            onChange={this.userNameEntry}
            errorText={this.state.shortUser ? 'Username must be at least 4 chars' : ''}
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
          />
          <RaisedButton
            style={{ marginLeft: '10px' }}
            disabled={this.state.mismatch || this.state.shortUser || !this.state.username || !this.state.password || !this.state.password2}
            onClick={this.handleSubmit}
            label="Login"
          />
        </div>
      </div>
    );
  }
}

export default Signup;
