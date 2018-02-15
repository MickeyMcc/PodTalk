import React from 'react';

const ShowEntry = (props) => {
  return (<div className = 'showEntry'>
    {props.show.title}
  </div>
  )
}

export default ShowEntry;