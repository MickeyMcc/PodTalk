import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  userNameEntry(event) {
    this.setState({ username: event.target.value });
  }

  passwordEntry(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    this.props.login(this.state.username, this.state.password);
  }

  render() {
        let paneStyle = {
      display: 'inline-block',
      backgroundColor: 'rgb(235, 235, 235)',
      border: '3px solid white',
      marginTop: '10px',
      marginLeft: '15px',
      padding: '10px',
      width: '40%'
    };

    return (
      <div style={paneStyle} >
        <div>
          <h3>Log In Here</h3>
          <h5>username</h5>
          <input type='text' value={this.state.username} onChange={this.userNameEntry.bind(this)} />

          <h5>password</h5>
          <input type='text' value={this.state.password} onChange={this.passwordEntry.bind(this)} />
          <button onClick={this.handleSubmit.bind(this)}> Login </button>
        </div>
      </div>
    )
  }
}

export default Login;