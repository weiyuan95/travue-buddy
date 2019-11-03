const newsAPIKey = process.env.VUE_APP_NEWS_API_KEY;

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