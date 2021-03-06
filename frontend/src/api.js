const newsAPIKey = process.env.VUE_APP_NEWS_API_KEY;
const openCageAPIKey = process.env.VUE_APP_OPEN_CAGE_API_KEY;
const unsplashAPIKey = process.env.VUE_APP_UNSPLASH_API_KEY;
const youtubeAPIkey = process.env.VUE_APP_YOUTUBE_API_KEY;
const fourSquareAPIKey = process.env.VUE_APP_FOURSQUARE_API_KEY;
const fourSquareApiSecret = process.env.VUE_APP_FOURSQUARE_SECRET;
const weatherAPIKey = process.env.VUE_APP_WEATHER_API_KEY;

/* eslint-disable no-console */
export async function getAllNews({ keyword }) {
    const newsAPIURL = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${newsAPIKey}`;

    let response = await fetch(newsAPIURL);
    response = await response.json();

    let articles = await response.articles.map((article) => {
        article.source = article.source.name;
        article.keyword = keyword;
        return article;
    });

    return articles;
}

export async function getWeather(lat, lng) {
    function titleCase(string) {
        var sentence = string.toLowerCase().split(" ");
        for (var i = 0; i < sentence.length; i++) {
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        sentence = sentence.join(" ");
        return sentence;
    }

    const weatherAPIURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherAPIKey}`;
    let response = await fetch(weatherAPIURL);
    response = await response.json();

    let weatherObject = response.weather[0];
    let weatherDetails = {
        description: titleCase(weatherObject.description),
        iconUrl: `http://openweathermap.org/img/wn/${weatherObject.icon}.png`,
        temperature:
            (Math.round((response.main.temp - 273.15) * 100) / 100).toFixed(1) +
            "°C",
    };

    return weatherDetails;
}

export async function getNearbyPlaces(lat, lng) {
    console.log(">>> NEARBY PLACES!!!!", lat, lng);
    let rightNow = new Date();
    let dateStr = rightNow
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const fourSquareURL =
        `https://api.foursquare.com/v2/venues/explore?` +
        `client_id=${fourSquareAPIKey}` +
        `&client_secret=${fourSquareApiSecret}` +
        `&ll=${lat},${lng}` +
        `&v=${dateStr}`;

    let response = await fetch(fourSquareURL);

    response = await response.json();
    let placeDetails = response.response.groups[0].items;
    let flattenedData = [];
    let stop = 1;

    for (let i in placeDetails) {
        if (stop == 7) {
            break;
        }

        let detail = placeDetails[i];
        let category = detail.venue.categories[0].name;
        let photos = await getPhotos({ keyword: category });
        let toAdd = {
            name: detail.venue.name,
            category: category,
            photoUrl: photos[getRandomInt(photos.length)],
        };

        flattenedData.push(toAdd);

        stop++;
    }

    return flattenedData;
}

export async function getVideos({ keyword }) {
    let splitKeyword = keyword.split(" ");
    let joinedKeyword = splitKeyword.join("%20") + "%20vlog";

    const youtubeURL =
        `https://www.googleapis.com/youtube/v3/search?` +
        `q=${joinedKeyword}&part=snippet&key=${youtubeAPIkey}`;

    let response = await fetch(youtubeURL);
    response = await response.json();

    let results = await response.items;
    let flattenedData = [];

    for (let i in results) {
        let videoId = results[i].id.videoId;
        let videoUrl = `https://www.youtube.com/embed/${videoId}`;

        flattenedData.push(videoUrl);
    }

    console.log(">>> flattenedData", flattenedData);

    return flattenedData.length != 0
        ? flattenedData
        : ["https://www.youtube.com/embed/H-0RHqDWcJE"];
}

export async function getPhotos({ keyword }) {
    let splitKeyword = keyword.split(" ");
    let joinedKeyword = splitKeyword.join("%20");

    const unsplashURL =
        `https://api.unsplash.com/search/photos?` +
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
    console.log(">>> GETTING DETAILS", keyword);
    let splitKeyword = keyword.split(" ");
    let joinedKeyword = splitKeyword.join("%20");

    const placesURL = `http://localhost:3000/places/${joinedKeyword}`;
    let response = await fetch(placesURL);
    response = await response.json();

    return response;
}

export async function getSafetyRating(countryCode) {
    countryCode = countryCode.toUpperCase();
    const tripSafetyUrl = `https://www.travel-advisory.info/api?countrycode=${countryCode}`;

    let response = await fetch(tripSafetyUrl);
    response = await response.json();
    let countryData = response.data[countryCode];
    let safetyRating = countryData.advisory.score;

    let object = {
        safetyRating: safetyRating,
    };

    return object;
}

export async function getCountryCode(lat, long) {
    console.log(">>> PLACES!!", lat);
    const openCageURL =
        `https://api.opencagedata.com/geocode/v1/` +
        `json?q=${lat}+${long}` +
        `&key=${openCageAPIKey}`;

    let response = await fetch(openCageURL);
    response = await response.json();

    let countryCode = response.results[0].components.country_code;

    return getSafetyRating(countryCode);
}
