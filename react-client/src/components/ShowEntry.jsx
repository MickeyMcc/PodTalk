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
            <img style={thumbnailStyle} src={show.littleImg} alt="" />
            <h5 onClick={this.goToShow}>{show.title}</h5>
          </div>
          <div style={CommentsStyle}>
            <h5 style={{ marginTop: '15px', marginLeft: '30px' }}>What you've said before:</h5>
            <ul>
              {oldComments.map(comment => <li style={CommentStyle}>{comment}<br /></li>)}
            </ul>
          </div>
        </div>
        <div style={{ display: 'inline-flex', flexDirection: 'row' }}>
          <textArea style={InputStyle} value={this.state.comment} placeholder="Say Something!" onChange={this.comment} />
          <button style={ButtonStyle} onClick={this.submit}> Save </button>
        </div>
      </div>
    );
  }
}

export default ShowEntry;
