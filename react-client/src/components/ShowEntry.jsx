import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { GridTile } from 'material-ui/GridList';
import CommentMode from 'material-ui/svg-icons/editor/mode-comment';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import { white } from 'material-ui/styles/colors';
import { IconStyle, DialogStyle } from '../styles';
import ShowDialog from './ShowDialog';

const styles = {
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
};

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
    this.removeShow = this.removeShow.bind(this);
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

  removeShow() {
    console.log('remove show!');
    axios.patch('/shows/remove', {
      userID: this.props.userID,
      showID: this.props.show.id,
    }).then(() => {
      console.log('done');
      this.handleClose();
      this.props.refresh();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { show, userID } = this.props;

    return (
      <GridTile
        title={show.title}
        subtitle={<span>by <b>{show.maker}</b></span>}
        actionIcon={
          <IconButton onClick={this.openShow}>
            <CommentMode color={white} style={IconStyle} />
          </IconButton>
        }
      >
        <img style={{ height: '33vw', width: '33vw' }} src={show.show_image} alt="" />
        <Dialog
          title={show.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
          contentStyle={{ width: "100%", maxWidth: "none" }}
        >
          <ShowDialog
            classes={{
                        paper: styles.dialogPaper,
                      }
                    }
            fetchUserEps={this.fetchUserEps}
            recentEpList={this.state.recentEpList}
            userEpList={this.state.userEpList}
            userLoading={this.state.userLoading}
            recentLoading={this.state.recentLoading}
            show={show}
            userID={userID}
            removeShow={this.removeShow}
          />
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
  refresh: PropTypes.func.isRequired,
};

export default ShowEntry;
