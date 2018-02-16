import React from 'react';



const ShowEntry = (props) => {

  const show = props.show;
  
  const entryStyle = {
    color: 'red',
    border: '2px solid grey',
    marginTop: '5px'
    //'rgb(129, 129, 129)',
    // backgroundColor: 'rgb(235, 235, 235)'
  }

  return (<div className = 'showEntry'>
    <div style={entryStyle}>
      <img className='thumbnail' src={show.bigImg} />
      <h5>{show.title}</h5>
    </div>
  </div>
  )
}

export default ShowEntry;