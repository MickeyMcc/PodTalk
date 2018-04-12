import React from 'react';
import { GridTile } from 'material-ui/GridList';
import CommentMode from 'material-ui/svg-icons/editor/mode-comment';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import { white } from 'material-ui/styles/colors';

class ShowEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      open: false,
    };
    this.submit = this.submit.bind(this);
    this.comment = this.comment.bind(this);
    this.openShow = this.openShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  openShow() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const oldComments = this.props.comments || [];

    const { show } = this.props;
    const iconStyle = {
      marginRight: '10px',
    };

    return (
      <div>
        <GridTile
          style={{ marginTop: '8px' }}
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
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    );
  }
}

export default ShowEntry;
