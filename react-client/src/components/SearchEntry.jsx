import React from 'react';

const SearchEntry = (props) => {
  const show = props.show;
  if (show.bigImg === undefined) {
    show.bigImg = 'http://icons.iconarchive.com/icons/shwz/disney/64/mickey-mouse-icon.png'
  }

  const entryStyle = {
    color: 'red',
    border: '2px solid grey',
    marginTop: '5px'
    //'rgb(129, 129, 129)',
    // backgroundColor: 'rgb(235, 235, 235)'
  }

  const addShow = function () {
    console.log('gonna add the show');
    props.addShow(props.show);
  }
  
  return (
    <div style = {entryStyle}>
      <img className = 'thumbnail' src = {show.bigImg}/>
      <h5 onClick = {addShow}>{show.title}</h5>
    </div>
  )
}

export default SearchEntry;

// {
//   "title": "Reply All",
//   "maker": "Gimlet",
//   "itunesUrl": "https://itunes.apple.com/us/podcast/reply-all/id941907967?mt=2&uo=4",
//   "littleImg": "http://is1.mzstatic.com/image/thumb/Music128/v4/22/0d/f6/220df688-843f-264a-b67e-28644b73c129/source/30x30bb.jpg",
//   "bigImg": "http://is1.mzstatic.com/image/thumb/Music128/v4/22/0d/f6/220df688-843f-264a-b67e-28644b73c129/source/60x60bb.jpg",
//   "latestRelease": "2018-02-15T11:00:00Z",
//   "trackCount": 135,
//   "genre": "Technology"
// }