import React from 'react';
import axios from 'axios';
import { ShowPageStyle, ButtonStyle, CommentsStyle, CommentStyle, ShowInfoStyle, BigImgStyle, EntryStyle } from '../styles.jsx';

class ShowPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    this.getShowComments();
  }

  getShowComments() {
    let context = this;
    axios({
      method: 'get',
      url: '/comments',
      params: {
        userID: 'all',
        showID: context.props.show.id
      }
    })
      .then(function(results) {
        console.log(results.data);
        context.setState({comments: results.data});
      })
      .catch(function(err) {
        console.log(err);
      }) 
  };

  comment(e) {
    this.setState({comment: e.target.value});
  }

  submit() {
    this.props.saveComment(this.state.comment, this.props.show.id);
    this.setState({comment: ''});
    this.getShowComments();
  }
  
  render () {
    const show = this.props.show;

    const entryStyle = {
      border: '2px solid grey',
      marginTop: '5px',
      backgroundColor: 'rgb(235, 235, 235)'
    }

    let oldComments = this.props.comments || [];
    return (
      <div style = {ShowPageStyle} >
        <img style= {BigImgStyle} src={show.bigImg} />
          <div style={ShowInfoStyle}>
            {show.title} <br/>
            {show.maker} <br/>
            {show.genre} <br/>
            <div style = {CommentsStyle}>
            <h5>The Chatter</h5>
            <br/>
            <ul>
            {this.state.comments.map((comment, index) => 
              {return (<li style = {EntryStyle} 
                key = {index}>
                  {comment.username}: {comment.text}
                </li>)})}
              </ul>
            <textArea value= {this.state.comment} onChange = {this.comment.bind(this)}/>
            <button onClick= {this.submit.bind(this)}> Save </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowPage;