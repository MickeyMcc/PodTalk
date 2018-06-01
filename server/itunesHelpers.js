const axios = require('axios');
const config = require('./config');

module.exports.searchListenNotes = (query, callback) => {
  axios.get('https://listennotes.p.mashape.com/api/v1/search', {
    params: {
      q: query,
      type: 'podcast',
    },
    headers: {
      'X-Mashape-Key': config.mashapeKey,
      Accept: 'application/json',
    },
  })
    .then((results) => {
      callback(null, results.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.episodesForShow = (showID, callback) => {
  axios.get(`https://listennotes.p.mashape.com/api/v1/podcasts/${showID}`, {
    headers: {
      'X-Mashape-Key': config.mashapeKey,
      Accept: 'application/json',
    },
  })
    .then((results) => {
      callback(null, results.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.parseShows = results => {
  return results.reduce((podList, podcast) => {
    podList.push({
      id: podcast.id,
      itunesID: podcast.itunes_id,
      title: podcast.title_original,
      maker: podcast.publisher_original,
      image: podcast.image,
      description: podcast.description_original,
      website: podcast.rss,
      latestRelease: podcast.lastest_pub_date_ms,
      genre: podcast.genres,
    });
    return podList;
  }, [])
};

module.exports.parseEpisodes = (results, showID) => {
  if (!results.episodes) {
    return [];
  }
  return results.episodes.reduce((epList, podcast) => {
    epList.push({
      title: podcast.title,
      description: podcast.description,
      audio: podcast.audio,
      id: podcast.id,
      showID,
      audioLength: podcast.audio_length,
      pubDate: podcast.pub_date_ms,
    });
    return epList;
  }, []);
};

// 'episode' search result ListenNotes
// {
//   episodes:
//   [{
//     description: '<p>Border Trilogy: </p>\n<p>While scouring the Sonoran Desert for objects left behind by 
//        migrants crossing into the United States, anthropologist Jason De León happened upon something he didn\'t 
//        <a href="https://pledge3.wnyc.org/donate/radiolab-it/onestep/?utm_source=podcast&amp;utm_medium=notes&amp;
//        utm_campaign=membership&amp;utm_content=radiolab">Radiolab.org/donate</a>.</em></p>\n<p> </p>\n<p> </p>',
//     pub_date_ms: 1522992660000,
//     title: 'Border Trilogy Part 2: Hold the Line',
//     audio_length: 3120,
//     audio: 'https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/rl_extras/rl_extras18bordertrilogyp2.mp3',
//     id: '90466c4fd00b4b9dba8952dc387355fa'
//  }]
// }

// module.exports.parseEpisodes = (results) => {
//   //show_id
//   //description
//   //audio
//   //id
//   //audio_length
// }

// 'podcast' search result ListenNotes
// {
//   results:
//   [{
//     rss: 'http://feeds.wnyc.org/radiolab',
//     publisher_highlighted: 'WNYC Studios',
//     itunes_id: 152249110,
//     description_original: 'A two-time PeabYC ore. \n',
//     title_original: 'Radiolab',
//     title_highlighted: '<span class="ln-search-highlight">Radiolab</span>',
//     lastest_pub_date_ms: '4 days ago',
//     publisher_original: 'WNYC Studios',
//     image: 'https://d3sv2eduhewoas.cloudfront.net/channel/image/727112a1e6a040948642c7b92207dbd0.jpeg',
//     description_highlighted: '. class="ln-search-highlight">Raience and',
//     id: '535815a492a941d79b95be6ae1c5cc9c',
//     genres: [Array]
//   }]
// }

