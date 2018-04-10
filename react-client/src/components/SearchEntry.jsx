import React from 'react';
import { EntryStyle, ButtonStyle, SearchInfoStyle } from '../styles';


const SearchEntry = (props) => {
  const { show } = props;
  if (show.bigImg === undefined) {
    show.bigImg = './images/mickey.png';
  }

  const addShow = () => {
    props.addShow(props.show);
  };

  const thumbnailStyle = {
    display: 'inline',
    margin: '3px',
  };

  const checkItOut = () => {
    props.makeShowActive(props.show, false);
  };

  return (
    <div style={EntryStyle}>
      <div style={{ display: 'inline-flex', flexDirection: 'row' }}>
        <img style={thumbnailStyle} src={show.bigImg} alt="" />
        <div>
          <div style={SearchInfoStyle}>
            <h4 onClick={checkItOut}>{show.title}</h4>
            <p>BTYB: {show.maker}, Topic: {JSON.stringify(show.genre)}</p>
          </div>
        </div>
        <button style={ButtonStyle} onClick={addShow}> Add </button>
      </div>
    </div>
  );
};

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
