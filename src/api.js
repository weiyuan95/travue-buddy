const newsAPIKey = process.env.VUE_APP_NEWS_API_KEY;
const openCageAPIKey = process.env.VUE_APP_OPEN_CAGE_API_KEY;
const unsplashAPIKey = process.env.VUE_APP_UNSPLASH_API_KEY;
const youtubeAPIkey = process.env.VUE_APP_YOUTUBE_API_KEY;
/* eslint-disable no-console */
export async function getAllNews({ keyword }) {
  
  const newsAPIURL = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${newsAPIKey}`

  let response = await fetch(newsAPIURL);
  response = await response.json();
  
  let articles = await response.articles.map(article => {
    article.source = article.source.name;
    article.keyword = keyword;
    return article;
  });

  return articles;
}


export async function getVideos({ keyword }) {
  
  let splitKeyword = keyword.split(" ");
  let joinedKeyword = splitKeyword.join("%20") + "%20vlog";

  const youtubeURL = `https://www.googleapis.com/youtube/v3/search?` + 
                      `q=${joinedKeyword}&part=snippet&key=${youtubeAPIkey}`

  let response = await fetch(youtubeURL);
  console.log(">>>> videos", response)
  response = await response.json();

  let results = await response.items;
  let flattenedData = [];

  for (let i in results) {
    let videoId = results[i].id.videoId;
    let videoUrl = `https://www.youtube.com/embed/${videoId}`;

    flattenedData.push(videoUrl);
  }  

  return flattenedData;
}

export async function getPhotos({ keyword }) {

  let splitKeyword = keyword.split(" ");
  let joinedKeyword = splitKeyword.join("%20");

  const unsplashURL = `https://api.unsplash.com/search/photos?` + 
                        `query=${joinedKeyword}&page=1&` +  
                        `client_id=${unsplashAPIKey}&` + 
                        `orientation=landscape`;

  let response = await fetch(unsplashURL);
  response = await response.json();

  let results = await response.results; 
  let flattenedData = [];

  for (let i in results) {
    let url = results[i].urls.regular;
    flattenedData.push(url);
  }

  return flattenedData;
}


export async function getPlacesDetails({ keyword }) {
  let splitKeyword = keyword.split(" ");
  let joinedKeyword = splitKeyword.join("%20");

  const placesURL = `https://travelvue-backend.herokuapp.com/places/${joinedKeyword}`;
  let response = await fetch(placesURL);
  response = await response.json();

  return response;
}


export async function getSafetyRating(countryCode) {
  countryCode = countryCode.toUpperCase();
  const tripSafetyUrl = `https://www.travel-advisory.info/api?countrycode=${countryCode}`

  let response = await fetch(tripSafetyUrl);
  response = await response.json();
  let countryData = response.data[countryCode]
  let safetyRating = countryData.advisory.score;

  let object = {
    safetyRating: safetyRating
  }

  return object;
}

export async function getCountryCode(lat, long) {
  const openCageURL = `https://api.opencagedata.com/geocode/v1/` +
                        `json?q=${lat}+${long}` +
                        `&key=${openCageAPIKey}`

  let response = await fetch(openCageURL)
  response = await response.json()
  
  let countryCode = response.results[0].components.country_code;

  return getSafetyRating(countryCode);
}