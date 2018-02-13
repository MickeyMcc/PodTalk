import React from 'react';
import ShowEntry from './ShowEntry.jsx';

const ShowList = (props) => {
  if (props.shows[0]) {
    console.log(props.shows[0].itunesId);
  }
  return (
  <div>
    <h4> List Component </h4>
    There are { props.shows.length } items.
    { props.shows.map(show => <ShowEntry item={show}/>)}
  </div>
)};

export default ShowList;