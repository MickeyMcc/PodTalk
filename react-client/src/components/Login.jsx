import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
        <TextField
          style={{ marginLeft: '10px' }}
          floatingLabelText="Username"
          value={this.state.username}
          onChange={this.userNameEntry}
        />
        <TextField
          style={{ marginLeft: '10px' }}
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.passwordEntry}
        />
        <RaisedButton 
          style={{ marginLeft: '10px' }}
          onClick={this.handleSubmit}
          label="Login"
        />
      </div>
    );
  }
}

export default Login;
