import React from 'react';
import PropTypes from 'prop-types';
import { GridList } from 'material-ui/GridList';
import ShowEntry from './ShowEntry';

const ShowList = (props) => {
  const cols = window.innerWidth > 500 ? 3 : 2;

  return (
    <div>
      <GridList
        cellHeight={`${Math.floor(100 / cols)}vh`}
        cols={cols}
      >
        {props.shows.map(show => (
          <ShowEntry
            show={show}
            key={show.id}
            userID={props.userID}
            refresh={props.refresh}
          />
        ))}
      </GridList>
    </div>
  );
};

ShowList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  userID: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default ShowList;
