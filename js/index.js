const stickyHeader = document.querySelector(".js-sticky")
const result = document.querySelector(".js-totalResults")
const searchInput = document.querySelector(".js-search")
const articles = document.querySelector(".articles")

document.addEventListener("DOMContentLoaded", async function() {
  const articlesData = await fetchData();
  drawArticles(articlesData);
});

function drawArticles(articlesData){
  let resultHtml = "";
  
  if (articlesData.length !== 0) {
    result.innerHTML = `${articlesData.length} RESULTS`;
    articlesData.forEach(article => resultHtml += drawArticle(article))
  } else {
    result.innerHTML = "NO RESULTS";
    resultHtml = drawNoResults();
  }

  articles.innerHTML = resultHtml;
}

function drawArticle(article){
  if (article.favorite !== undefined && article.favorite) {
    // es favorito
  }

  return `<h1> ${article.title} </h1>`
}

function drawNoResults() {
  return "<h1>No results</h1>"
}

async function searchInputChanged(e) {
  console.log(e.target.value);
  const data = await fetchData();
  console.log({ data })
  const searchResult = search(e.target.value,data)
  console.log(searchResult)
  drawArticles(searchResult);
}

searchInput.oninput = searchInputChanged 
async function fetchData() {
  const response = await fetch('http://localhost:3000/articles');
  return response.json();
}

function search(query, articles) {
  const lowerQuery = query.toLowerCase();
  return articles.filter(article => {
    const description = article.description.toLowerCase();
    const title = article.title.toLowerCase();
    return description.includes(lowerQuery) || title.includes(lowerQuery);
  })
}


// function for header sticky
window.onscroll = function() {stickyController()};
function stickyController() {
  const sticky = stickyHeader.offsetTop;
  if (window.pageYOffset > sticky) {
    stickyHeader.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// function for results 



