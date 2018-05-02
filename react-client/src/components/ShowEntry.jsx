import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { GridTile } from 'material-ui/GridList';
import CommentMode from 'material-ui/svg-icons/editor/mode-comment';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import { white } from 'material-ui/styles/colors';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import EpisodeEntry from './EpisodeEntry';

class ShowEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      recentEpList: [],
      userEpList: [],
      recentLoading: true,
      userLoading: true,
    };
    // this.submit = this.submit.bind(this);
    // this.comment = this.comment.bind(this);
    this.openShow = this.openShow.bind(this);
    this.fetchUserEps = this.fetchUserEps.bind(this);
    this.fetchRecentEps = this.fetchRecentEps.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // comment(e) {
  //   this.setState({ comment: e.target.value });
  // }

  // submit() {
  //   if (this.state.comment !== '') {
  //     this.props.saveComment(this.state.comment, this.props.show.id);
  //     this.setState({ comment: '' });
  //   }
  // }

  fetchUserEps() {
    axios.get('/episodes/user', {
      params: {
        userID: this.props.userID,
        showID: this.props.show.id,
      },
    })
      .then((results) => {
        this.setState({ userEpList: results.data, userLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchRecentEps() {
    axios.get('/episodes/recent', {
      params: {
        userID: this.props.userID,
        showID: this.props.show.id,
      },
    })
      .then((results) => {
        this.setState({ recentEpList: results.data, recentLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openShow() {
    this.fetchRecentEps();
    this.fetchUserEps();
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { show, userID } = this.props;
    const iconStyle = {
      marginRight: '10px',
    };

    return (
      <GridTile
        title={show.title}
        subtitle={<span>by <b>{show.maker}</b></span>}
        actionIcon={
          <IconButton onClick={this.openShow}>
            <CommentMode color={white} style={iconStyle} />
          </IconButton>
        }
      >
        <img src={show.show_image} alt="" />
        <Dialog
          title={show.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          {show.show_description}
          <Divider style={{ marginTop: 8 }} />
          <Tabs>
            <Tab label="Your Eps">
              {this.state.userLoading ?
                <RefreshIndicator
                  size={40}
                  style={{ position: 'relative' }}
                  left={50}
                  top={20}
                  status="loading"
                />
              :
                this.state.userEpList.length ?
                  <List style={{ maxHeight: 300, overflow: 'auto' }}>
                    {this.state.userEpList.map(episode => (
                      <EpisodeEntry
                        episode={episode}
                        key={episode.id}
                        userID={userID}
                        showID={show.id}
                        fetchUserEps={this.fetchUserEps}
                      />
                    ))}
                  </List>
                  :
                  <div> You have not listened to any episodes of this show yet! </div>
              }
            </Tab>
            <Tab label="Recent Eps">
              {this.state.recentLoading ?
                <RefreshIndicator
                  size={40}
                  style={{ position: 'relative' }}
                  left={50}
                  top={20}
                  status="loading"
                />
              :
                <List style={{ maxHeight: 300, overflow: 'auto' }} >
                  {this.state.recentEpList.map(episode => (
                    <EpisodeEntry
                      episode={episode}
                      key={episode.id}
                      userID={userID}
                      showID={show.id}
                      fetchUserEps={this.fetchUserEps}
                    />
                  ))}
                </List>
              }
            </Tab>
          </Tabs>
        </Dialog>
      </GridTile>
    );
  }
}

ShowEntry.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  userID: PropTypes.number.isRequired,
};

export default ShowEntry;
