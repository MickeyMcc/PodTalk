import React from 'react';
import { EntryStyle, ButtonStyle, ShowInfoStyle, CommentsStyle, CommentStyle, InputStyle } from '../styles';


class ShowEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.submit = this.submit.bind(this);
    this.comment = this.comment.bind(this);
    this.goToShow = this.goToShow.bind(this);
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

  goToShow() {
    this.props.makeShowActive(this.props.show, true);
  }

  render() {
    const oldComments = this.props.comments || [];

    const { show } = this.props;

    const thumbnailStyle = {
      display: 'inline',
      margin: '3px',
    };

    return (
      <div style={EntryStyle}>
        <div style={{ display: 'inline-flex', flexDirection: 'row' }}>
          <div style={ShowInfoStyle}>
            <img style={thumbnailStyle} src={show.show_image} alt="" />
            <h5 onClick={this.goToShow}>{show.title}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowEntry;
