var axios = require('axios');
const config = require('./config');


module.exports.searchListenNotes = (query, callback) => {
  axios.get(
    'https://listennotes.p.mashape.com/api/v1/search', {
      params: {
        q: query,
        type: 'podcast',
      },
      headers: {
        'X-Mashape-Key': config.mashapeKey,
        'Accept': 'application/json',
      },
    }
  )
  .then((results) => {
    callback(null, results.data);
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.searchOnITunes = (query, callback) => {
  axios.get(
      'https://itunes.apple.com/search', {
        params: {
          term: query,
          country: 'US',
          media: 'podcast',
          entity: 'podcast',
          limit: 10
        },
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
  for (let podcast of results) {
    let aShow = {
      title : podcast.trackName,
      maker : podcast.artistName,
      itunesUrl : podcast.collectionViewUrl,
      littleImg : podcast.artworkUrl100,
      bigImg : podcast.artworkUrl600,
      latestRelease : podcast.releaseDate,
      trackCount : podcast.trackCount,
      genre : podcast.primaryGenreName
    }
    importantStuff.push(aShow);
  }
  return importantStuff;
}

module.exports.importantStuff = getTheImportantStuff;

module.exports.listenNotesProcess = (results) => {
  var importantStuff = [];
  console.log('LENGTH:::::::::::::::::::::::::::', results.length);

  for (let podcast of results) {
    console.log('A PODCAST____________________', podcast);
    let aShow = {
      title: podcast.title_original,
      maker: podcast.publisher_original,
      itunesID: podcast.itunes_id,
      LNID: podcast.id,
      bigImg: podcast.img,
      latestRelease: podcast.lastest_pub_date_ms,
      genres: podcast.genres,
      descriptions: podcast.description_original,
      website: podcast.rss,
    }
    importantStuff.push(aShow);
  }
  console.log('FINAL______________________________', importantStuff);

  return importantStuff;
}

// 'podcast' search result ListenNotes
// {
//   results:
//   [{
//     rss: 'http://feeds.wnyc.org/radiolab',
//     publisher_highlighted: 'WNYC Studios',
//     itunes_id: 152249110,
//     description_original: 'A two-time Peabody Award-winner, Radiolab is an investigation told through sounds and stories, and centered around one big idea. In the Radiolab world, information sounds like music and science and culture collide. Hosted by Jad Abumrad and Robert Krulwich, the show is designed for listeners who demand skepticism, but appreciate wonder. \n\nWNYC Studios is the producer of other leading podcasts including Freakonomics Radio, Death, Sex &amp; Money, On the Media and many more. \n',
//     title_original: 'Radiolab',
//     title_highlighted: '<span class="ln-search-highlight">Radiolab</span>',
//     lastest_pub_date_ms: '4 days ago',
//     publisher_original: 'WNYC Studios',
//     image: 'https://d3sv2eduhewoas.cloudfront.net/channel/image/727112a1e6a040948642c7b92207dbd0.jpeg',
//     description_highlighted: '...A two-time Peabody Award-winner, <span class="ln-search-highlight">Radiolab</span> is an investigation told through sounds and stories, and centered around one big idea. In the <span class="ln-search-highlight">Radiolab</span> world, information sounds like music and science and',
//     id: '535815a492a941d79b95be6ae1c5cc9c',
//     genres: [Array]
//   }]
// }  

// 'episode' search result ListenNotes
// {
//   results:
//   [{
//     podcast_title_original: 'Radiolab',
//     publisher_highlighted: 'WNYC Studios',
//     rss: 'http://feeds.wnyc.org/radiolab',
//     itunes_id: 152249110,
//     description_original: 'We thought we knew the story of Bernie Madoff.  How he masterminded the biggest Ponzi scheme in history, leaving behind scores of distraught investors and a $65 billion black hole. \nBut we had never heard the story from Madoff himself.\nThis week, reporter Steve Fishman and former Radiolabber Ellen Horne visit our studio to play us snippets from their extraordinary Audible series Ponzi Supernova, which features exclusive footage of the man who bamboozled the world.  After years of investigative reporting – including interviews with dozens of FBI and SEC agents, investors, traders, and attorneys – the pair scrutinize Madoff’s account to understand exactly why he did it, how he managed to pull it off, and how culpable he actually was. Was he a puppetmaster or a puppet? And if the latter, who else is to blame for the biggest financial fraud in history?\nYou can hear the entire series on iTunes or for free on Audible\nSupport Radiolab by becoming a member today at Radiolab.org/donate.    ',
//     audio: 'https://www.listennotes.com/e/p/a5881ce8d20a412682bf7430e58fcbd1/',
//     title_highlighted: '<span class="ln-search-highlight">Radiolab</span> Presents: Ponzi Supernova',
//     pub_date_ms: 1486705500000,
//     id: 'a5881ce8d20a412682bf7430e58fcbd1',
//     publisher_original: 'WNYC Studios',
//     image: 'https://d3sv2eduhewoas.cloudfront.net/channel/image/727112a1e6a040948642c7b92207dbd0.jpeg',
//     podcast_title_highlighted: '<span class="ln-search-highlight">Radiolab</span>',
//     description_highlighted: '... else is to blame for the biggest financial fraud in history?\nYou can hear the entire series on iTunes or for free on Audible\nSupport <span class="ln-search-highlight">Radiolab</span> by becoming a member today at Radiolab.org/donate.    ',
//     genres: [Array],
//     audio_length: '00:38:00',
//     title_original: 'Radiolab Presents: Ponzi Supernova',
//     podcast_id: '535815a492a941d79b95be6ae1c5cc9c'
//   }]
// }