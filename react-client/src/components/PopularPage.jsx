
import React from 'react';

class PopularPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      users: {}, //{username: {comments, conections}}
      shows: {}, //{title: {comments, connections}}
      usersSort: '',
      showsSort: ''
    }
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

}