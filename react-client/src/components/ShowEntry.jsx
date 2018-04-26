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
import {Tabs, Tab } from 'material-ui/Tabs';
import EpisodeEntry from './EpisodeEntry';

class ShowEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      open: false,
      recentEpList: [],
      userEpList: [],
      recentLoading: true,
      yourLoading: true,
    };
    this.submit = this.submit.bind(this);
    this.comment = this.comment.bind(this);
    this.openShow = this.openShow.bind(this);
    this.fetchUserEps = this.fetchUserEps.bind(this);
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

  fetchUserEps() {
    axios.get('/episodes/user', {
      params: {
        userID: this.props.userID,
        showID: this.props.show.id,
      }
    })
      .then((results) => {
        console.log(results.data, 'foundEps');
        this.setState({ userEpList: results.data, userLoading: false })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchRecentEps() {
    axios.get('/episodes/recent', {
      params: {
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
      <div>
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
        </GridTile>
        <Dialog
          title={show.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
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
                      <EpisodeEntry episode={episode} key={episode.id} userID={userID} showID={show.id} />
                    ))}
                  </List>
                  :
                  <div> You haven't listened to any episodes of this show yet! </div>
              }
            </Tab>
            <Tab label="Recent Eps">
              {this.state.recentLoading ?
                <RefreshIndicator
                  size={40}
                  style={{ position : 'relative'}}
                  left={50}
                  top={20}
                  status="loading"
                />
              :
                <List style={{ maxHeight: 300, overflow: 'auto'}} >
                  {this.state.recentEpList.map(episode => (
                    <EpisodeEntry
                      episode={episode}
                      key={episode.LNID}
                      userID={userID}
                      showID={show.id}
                      refreshShow={this.fetchUserEps}
                    />
                  ))}
                </List>
              }
            </Tab>
          </Tabs>
          {/* <EpisodesView show={show} user={this.props.user} /> */}
        </Dialog>
      </div>
    );
  }
}

export default ShowEntry;
