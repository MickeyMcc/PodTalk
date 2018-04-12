import React from 'react';
import ListItem from 'material-ui/List';

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
        {this.props.episode.title}
      </ListItem>
    );
  }
}

export default EpisodeEntry;
