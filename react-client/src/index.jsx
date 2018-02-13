import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      shows: [],
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>PodStar</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userShows: state.userShows
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    onAddShow: (show) => dispatch(addShow(show)),
    onReset: () => dispatch(reset())
  }
}

ReactDOM.render(<App />, document.getElementById('app'));