const newsAPIKey = process.env.VUE_APP_NEWS_API_KEY;
const openCageAPIKey = process.env.VUE_APP_OPEN_CAGE_API_KEY;
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


export async function getPlacesDetails({ keyword }) {
  let splitKeyword = keyword.split(" ");
  let joinedKeyword = splitKeyword.join("%20");

  const placesUrl = `https://travelvue-backend.herokuapp.com/places/${joinedKeyword}`;
  let response = await fetch(placesUrl);
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