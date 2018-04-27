/* jshint esversion: 6 */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class EpisodeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listened: false,
    };
    this.markListened = this.markListened.bind(this);
  }

  markListened() {
    axios.post('/episodes/listen', {
      userID: this.props.userID,
      episode: this.props.episode,
      showID: this.props.showID,
    })
      .then(() => {
        this.setState({ listened: !this.state.listened });
        this.props.fetchUserEps();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    return (
      <ListItem>
        <Card>
          <CardHeader
            title={this.props.episode.title}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            <div dangerouslySetInnerHTML={{ __html: this.props.episode.description }} />
          </CardText>
          <CardActions>
            <FlatButton label="Talk About it" primary />
            <FlatButton onClick={this.markListened} label={this.state.listened ? 'Unlisten' : 'Mark Listened'} primary={!this.state.listened} default={this.state.listened} />
          </CardActions>
        </Card>
      </ListItem>
    );
  }
}

EpisodeEntry.propTypes = {
  episode: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  userID: PropTypes.number.isRequired,
  showID: PropTypes.string.isRequired,
  fetchUserEps: PropTypes.func.isRequired,
};

export default EpisodeEntry;
