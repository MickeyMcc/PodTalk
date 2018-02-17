import React from 'react';
import axios from 'axios';

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

    const thumbnailStyle = {
      display: 'inline',
      margin: '3px'
    }
    let oldComments = this.props.comments || [];
    return (
      <div className='focus' >
        <img style= {thumbnailStyle} src={show.bigImg} />
        <h5>{show.title}</h5>
        The Chatter
        {this.state.comments.map((comment, index) => {return (<div key = {index}>{comment.username}: {comment.text}</div>)})}
        <textArea value= {this.state.comment} onChange = {this.comment.bind(this)}/>
        <button onClick= {this.submit.bind(this)}> Save </button>
      
      </div>
    )
  }
}

export default ShowPage;