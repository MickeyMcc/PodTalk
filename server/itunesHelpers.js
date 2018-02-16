var axios = require('axios');

const searchOnITunes = function (query, callback) {
  axios.get(
      'https://itunes.apple.com/search', {
        params: {
          term: query,
          country: 'US',
          media: 'podcast',
          entity: 'podcast',
          limit: 10
        }
      }
    )
    .then(function (data) {
      results = data.data.results; //brings you down to just each podcast entry
      callback(null, results);
    })
    .catch(function (err) {
      callback(err, null);
    })
} 

const getTheImportantStuff = function (results) {
  var importantStuff = [];
  for (var podcast of results) {
    let aShow = {
      title : podcast.trackName,
      maker : podcast.artistName,
      itunesUrl : podcast.collectionViewUrl,
      littleImg : podcast.artworkUrl30,
      bigImg : podcast.artworkUrl60,
      latestRelease : podcast.releaseDate,
      trackCount : podcast.trackCount,
      genre : podcast.primaryGenreName
    }
    importantStuff.push(aShow);
  }
  return importantStuff;
}

module.exports.search = searchOnITunes;
module.exports.importantStuff = getTheImportantStuff;