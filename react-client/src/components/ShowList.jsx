import React from 'react';
import ShowEntry from './ShowEntry';
import { PaneStyle } from '../styles';


const ShowList = (props) => {
  let message = '';
  if (props.shows.length === 0) {
    message = 'You don\'t have any shows yet! Try searching and adding some you like to have them show up here!';
  } else {
    message = `You have ${props.shows.length} shows so far.`;
  }

  if (!props.comments) {
    props.comments = {};
  }
  return (
    <div style={PaneStyle}>
      <h4> Your Shows </h4>
      {message}
      {props.shows.map((show, index) => (
        <ShowEntry
          show={show}
          key={index}
          comments={props.comments[show.id]}
          saveComment={props.saveComment}
          makeShowActive={props.makeShowActive}
        />
      ))}
    </div>
  );
};

export default ShowList;
