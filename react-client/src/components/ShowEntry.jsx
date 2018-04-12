import React from 'react';
import axios from 'axios';
import { GridTile } from 'material-ui/GridList';
import CommentMode from 'material-ui/svg-icons/editor/mode-comment';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import { white } from 'material-ui/styles/colors';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import EpisodeEntry from './EpisodeEntry';

class ShowEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      open: false,
      epList: [],
      loading: true,
    };
    this.submit = this.submit.bind(this);
    this.comment = this.comment.bind(this);
    this.openShow = this.openShow.bind(this);
  }

  comment(e) {
    this.setState({ comment: e.target.value });
  }

  submit() {
    if (this.state.comment !== '') {
      this.props.saveComment(this.state.comment, this.props.show.id);
      this.setState({ comment: '' });
    }
  }

  openShow(showID) {
    axios.get('/episodeList', {
      params: {
        showID,
      },
    })
      .then((results) => {
        this.setState({ epList: results.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { show } = this.props;
    const iconStyle = {
      marginRight: '10px',
    };

    return (
      <div>
        <GridTile
          title={show.title}
          subtitle={<span>by <b>{show.maker}</b></span>}
          actionIcon={
            <IconButton onClick={() => this.openShow(show.id)}>
              <CommentMode color={white} style={iconStyle} />
            </IconButton>
          }
        >
          <img src={show.show_image} alt="" />
        </GridTile>
        <Dialog
          title={show.title}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
        >
          {show.show_description}
          <Divider />
          {this.state.loading ?
            <RefreshIndicator
              size={40}
              left={300}
              top={150}
              status="loading"
            />
          :
            <List>
              <Subheader> Recent Episodes </Subheader>
              {this.state.epList.map(episode => (
                <EpisodeEntry episode={episode} key={episode.LNID} />
              ))}
            </List>
          }
        </Dialog>
      </div>
    );
  }
}

export default ShowEntry;
