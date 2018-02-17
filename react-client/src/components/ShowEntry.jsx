import React from 'react';
import {EntryStyle, ButtonStyle, ShowInfoStyle, CommentsStyle, CommentStyle, InputStyle} from '../styles.jsx';


class ShowEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment : '',
    };
  }

  comment(e) {
    this.setState({comment: e.target.value});
  }

  submit() {
    if (this.state.comment !== '') {
      this.props.saveComment(this.state.comment, this.props.show.id);
      this.setState({comment: ''});
    }
  }

  goToShow() {
    this.props.makeShowActive(this.props.show);
  }  

  render() {
    let oldComments = this.props.comments || [];
    
    const show = this.props.show;

    const thumbnailStyle = {
      display: 'inline',
      margin: '3px'
    }

    return (
      <div style = {EntryStyle}>
        <div style={ShowInfoStyle}>
          <img style= {thumbnailStyle} src={show.bigImg} />
          <h5 onClick = {this.goToShow.bind(this)}>{show.title}</h5>
        </div>
        <div style = {CommentsStyle}>
        What you've said before: 
        {oldComments.map(comment => <div style = {CommentStyle}>{comment}<br/></div>)}
        <textArea style = {InputStyle} value= {this.state.comment} placeholder = 'Say Something!' onChange = {this.comment.bind(this)}/>
        <button style = {ButtonStyle} onClick= {this.submit.bind(this)}> Save </button>
        </div>
      </div>
    )
  }
}

export default ShowEntry;