import React from 'react';
import ShowEntry from './ShowEntry.jsx';

const ShowList = (props) => {
  return (
  <div className='show-list pane'>
    <h4> Your Shows </h4>
    You have { props.shows.length } shows so far.
    { props.shows.map((show, index) => 
      <ShowEntry show={show} 
        key = {index}
      />
    )}
  </div>
)};

export default ShowList;