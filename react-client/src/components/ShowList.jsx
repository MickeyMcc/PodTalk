import React from 'react';
import { GridList } from 'material-ui/GridList';
import ShowEntry from './ShowEntry';

const ShowList = (props) => {
  let message = '';
  if (props.shows.length === 0) {
    message = 'You don\'t have any shows yet! Try searching and adding some you like to have them show up here!';
  } else {
    message = `You have ${props.shows.length} shows so far.`;
  }

  const cols = window.innerWidth > 500 ? 3 : 2;

  return (
    <div>
      <GridList
        cellHeight={window.innerWidth / cols}
        cols={cols}
      >
        {props.shows.map((show, index) => (
          <ShowEntry
            show={show}
            key={show.id}
            userID={props.userID}
          />
        ))}
      </GridList>
    </div>
  );
};

export default ShowList;
