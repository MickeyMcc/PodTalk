import React from 'react';

const SearchEntry = (props) => {
  const { show } = props;
  if (show.image === undefined) {
    show.image = './images/mickey.png';
  }

  const addShow = () => {
    props.addShow(props.show);
  };

  const checkItOut = () => {
    props.makeShowActive(props.show, false);
  };

  return (
    <div>
      <div>
        <img src={show.image} alt="" />
        <div>
          <div>
            <h4 onClick={checkItOut}>{show.title}</h4>
            <p>BTYB: {show.maker}, Topic: {JSON.stringify(show.genre)}</p>
          </div>
        </div>
        <button onClick={addShow}> Add </button>
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
