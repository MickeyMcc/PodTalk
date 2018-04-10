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

module.exports.parseShows = results => (
  results.reduce((podList, podcast) => {
    podList.push({
      LNID: podcast.id,
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
);

module.exports.parseEpisodes = results => (
  results.reduce((epList, podcast) => {
    epList.push({
      showTitle: podcast.podcast_title_original,
      description: podcast.description_original,
      audio: podcast.audio,
      LNID: podcast.id,
      showID: podcast.podcast_id,
      audioLength: podcast.audio_length,
      title: podcast.title_original,
    });
    return epList;
  }, [])
);

// 'episode' search result ListenNotes
// {
//   results:
//   [{
//     podcast_title_original: 'Radiolab',
//     publisher_highlighted: 'WNYC Studios',
//     rss: 'http://feeds.wnyc.org/radiolab',
//     itunes_id: 152249110,
//     description_original: 'We thought we knew the story of Bernie Madoff.',
//     audio: 'https://www.listennotes.com/e/p/a5881ce8d20a412682bf7430e58fcbd1/',
//     title_highlighted: '<span class="ln-search-highlight">Radiolab</ Ponzi Supernova',
//     pub_date_ms: 1486705500000,
//     id: 'a5881ce8d20a412682bf7430e58fcbd1',
//     publisher_original: 'WNYC Studios',
//     image: 'https://d3sv2eduhewoas.cloudfront.net/channel/image/727112a1e6a040948642c7b92207dbd0.jpeg',
//     podcast_title_highlighted: '<span class="ln-search-highlight">Radiolab</span>',
//     description_highlighted: '... else is to blame ',
//     genres: [Array],
//     audio_length: '00:38:00',
//     title_original: 'Radiolab Presents: Ponzi Supernova',
//     podcast_id: '535815a492a941d79b95be6ae1c5cc9c'
//   }]
// }

// module.exports.parseEpisodes = (results) => {
//   //show_id
//   //description
//   //audio
//   //LNID
//   //audio_length
//   //episode id
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

