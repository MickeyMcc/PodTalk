import React from 'react';

class Signup extends React.Component {
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
    this.props.signup(this.state.username, this.state.password);
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
    // 'rgb(235, 235, 235)'

    const buttonStyle = {

    };

    return (
      <div style={paneStyle} >
        <div>
          <h3>Sign Up Over Here</h3>
          <h5>Username</h5>
          <input type='text' 
            value={this.state.username} 
            onChange={this.userNameEntry.bind(this)} 
          />
          <h5>Password</h5>
          <input type='text' 
            value={this.state.password} 
            onChange={this.passwordEntry.bind(this)} 
          />
          <button onClick={this.handleSubmit.bind(this)}> Sign Me Up </button>
        </div>
      </div>
    )
  }
}

export default Signup;