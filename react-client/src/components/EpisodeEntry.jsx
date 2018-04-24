import React from 'react';
import ListItem from 'material-ui/List';
import {Card, CardActions, Cardheader, CardText, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class EpisodeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      open: false,
    };
  }

  render() {
    return (
      <ListItem>
        <Card>
          <CardHeader
            title={this.props.episode.title}
          />
          <CardText>
            {this.props.episode.description}
          </CardText>
          <CardActions>
            <FlatButton label='Talk About it' />
            <FlatButton label='Mark Listened' />
          </CardActions>
        </Card>
      </ListItem>
    );
  }
}

export default EpisodeEntry;
