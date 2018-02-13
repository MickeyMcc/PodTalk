import React from 'react';

const SearchEntry = (props) => {
  if (props) {
    console.log(props)
  }
  return (
    <div>
      {props.result}
    </div>
  )
}

export default SearchEntry;