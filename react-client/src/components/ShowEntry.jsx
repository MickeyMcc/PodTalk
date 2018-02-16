import React from 'react';



class ShowEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment : 'Say Something!'
    };
  }

  comment(e) {
    this.setState({comment: e.target.value});
  }

  submit(e) {
    this.props.saveComment(this.state.comment, this.props.show.id);
  }

  render() {
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
        <h5>{show.title}</h5>
        Say Something about this show
        <textArea value= {this.state.comment} onChange = {this.comment.bind(this)}/>
        <button onClick= {this.submit.bind(this)}> Save </button>
      </div>
    )
  }
}

export default ShowEntry;