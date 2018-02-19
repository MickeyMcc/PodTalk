
import React from 'react';
import axios from 'axios';
import { EntryStyle, PaneStyle, MainStyle } from '../styles.jsx';
import _ from 'lodash';

class PopularPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      users: {}, //{username: {comments, conections}}
      shows: {}, //{title: {comments, connections}}
      usersSort: 'connections',
      showsSort: 'connections'
    }
  }

  componentDidMount() {
    this.getInfo('users');
    this.getInfo('shows');
  }

  getInfo(entity) {  //entity = 'shows' or 'users'
    let context = this;
    axios({
      method: 'get',
      url: '/activity',
      params: {
        type: entity
      }
    })
      .then(function (results) {
        if (entity === 'users') {
          context.setState({users: results.data});
        } else {
          context.setState({shows: results.data});
        }
      })
      .catch(function (err) {
        console.log('err', err);
      });
  }

  sortUsers(type) {
    this.setState({usersSort: type});
  }

  sortShows(type) {
    this.setState({showsSort: type})
  }

  renderEntry(data, sortType) {
    console.log('hey', data);
    var stuff = _.map(data, (entry, key) => {
      console.log(key, '       ', entry, sortType);
      if (entry[sortType] > 1) {
        return (<div style={EntryStyle}> {key} : {entry[sortType]} {sortType} </div>);
      }
    });
    console.log(typeof stuff);
    return stuff;
  }

  render() {
    return(
      <div style = {MainStyle}>  
      <div style={PaneStyle}> 
        <h4>Top Users</h4>
          <h5> Sort by :
            <a onClick={this.sortUsers.bind(this, 'adds')}> Adds </a>
            <a onClick={this.sortUsers.bind(this, 'comments')}>| Comments </a>
          </h5>
        {this.renderEntry(this.state.users, this.state.usersSort)}
      </div>
      <div style={PaneStyle}> 
      <h4>Top Shows</h4>
        <h5> Sort by :
        <a onClick={this.sortShows.bind(this, 'adds')}> Adds </a>
          <a onClick={this.sortShows.bind(this, 'comments')}>| Comments </a>
        </h5>
        {this.renderEntry(this.state.shows, this.state.showsSort)}
      </div>
      </div>
    )
  }

}

export default PopularPage;