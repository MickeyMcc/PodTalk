import React from 'react';
import axios from 'axios';

class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      owned: props.owned,
    };
    this.comment = this.comment.bind(this);
    this.submit = this.submit.bind(this);
    this.addShow = this.addShow.bind(this);
  }

  getShowComments() {
    const context = this;
    axios({
      method: 'get',
      url: '/comments',
      params: {
        userID: 'all',
        showID: context.props.show.id,
      },
    })
      .then((results) => {
        context.setState({ comments: results.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  comment(e) {
    this.setState({ comment: e.target.value });
  }

  submit() {
    this.props.saveComment(this.state.comment, this.props.show.id);
    this.setState({ comment: '' });
    this.getShowComments();
  }

  addShow() {
    this.props.addShow(this.props.show);
    this.setState({ owned: true });
  }

  render() {
    const { show } = this.props;

    if (this.state.owned) {
      return (
        <div>
          <div>
            <img src={show.show_image} alt="" />
            <h5>{show.title} </h5>
            <h5>{show.maker} </h5>
            <h5>{show.genre} </h5>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <img src={show.bigImg} alt="" />
          <h5>{show.title} </h5>
          <h5>{show.maker} </h5>
          <h5>{show.genre} </h5>
        </div>
        <div>
          <h4>The Chatter</h4>
          <ul>
            {this.state.comments.map((comment, index) => (
              <li
                key={index}
              >
                {comment.username}: {comment.text}
              </li>
            ))}
            <button onClick={this.addShow}> Add Show </button>
          </ul>
        </div>
      </div>
    );
  }
}

export default ShowPage;
