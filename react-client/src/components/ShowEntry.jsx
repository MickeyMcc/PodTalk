import React from 'react';

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

    return (
      <div>
        <div>
          <img src={show.show_image} alt="" />
          <h5 onClick={this.goToShow}>{show.title}</h5>
        </div>
      </div>
    );
  }
}

export default ShowEntry;
