import React from 'react';
import ShowEntry from './ShowEntry.jsx';

const ShowList = (props) => {
  let message = '';
  if (props.shows.length === 0) {
    message = 'You don\'t have any shows yet! Try searching and adding some you like to have them show up here!';
  } else {
    message = `You have ${props.shows.length} shows so far.`;
  }

  return (
    <div className='show-list pane'>
      <h4> Your Shows </h4>
      {message}
      {props.shows.map((show, index) => <ShowEntry 
        show = {show} 
        key = {index} 
        saveComment = {props.saveComment}
        /> 
      )}
    </div>
  )
};

export default ShowList;