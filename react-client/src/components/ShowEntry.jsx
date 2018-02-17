import React from 'react';



class ShowEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment : 'Say Something!',
    };
  }

  comment(e) {
    this.setState({comment: e.target.value});
  }

  submit() {
    this.props.saveComment(this.state.comment, this.props.show.id);
    this.setState({comment: ''});
  }

  goToShow() {
    this.props.makeShowActive(this.props.show);
  }  

  render() {
    let oldComments = this.props.comments || [];
    
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

    return (
      <div style={entryStyle}>
        <img style= {thumbnailStyle} src={show.bigImg} />
        <h5 onClick = {this.goToShow.bind(this)}>{show.title}</h5>
        What you've said before: 
        {oldComments.map(comment => <div>{comment}</div>)}
        <textArea value= {this.state.comment} onChange = {this.comment.bind(this)}/>
        <button onClick= {this.submit.bind(this)}> Save </button>
      </div>
    )
  }
}

export default ShowEntry;