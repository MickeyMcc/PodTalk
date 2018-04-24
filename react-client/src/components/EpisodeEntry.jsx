import React from 'react';
import axios from 'axios';
import ListItem from 'material-ui/List';
import {Card, CardActions, Cardheader, CardText, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class EpisodeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      open: false,
      listened: false,
    };
    this.markListened = this.markListened.bind(this);
  }

  markListened() {
    this.setState({ listened: true });
    axios.post('/episodes/listen', {
      userID: this.props.userID,
      episodeID: this.props.LNID,
    })
      .then((results) => {
        this.setState({ listened: true });
      })
      .catch((err)=> {
        console.log(err);
      })
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
            <FlatButton label='Talk About it' primary={true} />
            <FlatButton onClick={this.markListened} label='Mark Listened' primary={!this.state.listened} default={this.state.listened} />
          </CardActions>
        </Card>
      </ListItem>
    );
  }
}

export default EpisodeEntry;
