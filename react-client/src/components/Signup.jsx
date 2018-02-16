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
    return (
      <div className='signup pane' >
        <div>
          <input type='text' value={this.state.username} onChange={this.userNameEntry.bind(this)} />
          <input type='text' value={this.state.password} onChange={this.passwordEntry.bind(this)} />
          <button onClick={this.handleSubmit.bind(this)}> Search! </button>
        </div>
      </div>
    )
  }
}

export default Signup;