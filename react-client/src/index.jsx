import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ShowList from './components/ShowList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      shows: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/shows', 
      success: (data) => {
        this.setState({
          shows: data
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
      <ShowList shows={this.state.shows}/>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    shows: state.shows
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