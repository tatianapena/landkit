const stickyHeader = document.querySelector(".js-sticky")
const result = document.querySelector(".js-totalResults")
const searchInput = document.querySelector(".js-search")
const articles = document.querySelector(".articles")
// let bodyElement = document.body;
// let cardElement = document.createElement('section');
// let containerElement = document.createElement('div');
// let cardContainer = document.createElement('div');
// let cardHeader = document.createElement('div');
// let cardFavorite = document.createElement('div');
// let cardStar = document.createElement('img');
// let cardPrice = document.createElement('div');
// let cardValue = document.createElement('p');
// let cardImage = document.createElement('div');
// let cardPhoto = document.createElement('img');
// let cardTitle = document.createElement('h5');
// let cardParagraph = document.createElement('p');
// let cardFooter = document.createElement('div');
// let cardSign = document.createElement('div');
// let cardAvatar = document.createElement('img');
// let cardName = document.createElement('p');
// let cardDate = document.createElement('time');
// let cardBtn =document.createElement('div');
// let cardLink = document.createElement('a');
// let cardArrow = document.createElement('img');


// cardElement.className ='card';
// containerElement.className ='container';
// cardContainer.className ='card__container';
// cardHeader.className ='card__header';
// cardFavorite.className ='card__favorite';
// cardStar.src ='./assets/Star-fill.png';
// cardStar.setAttribute("alt","fill star");
// cardPrice.className ='card__price';
// cardValue.className ='card__value';
// cardValue.innerText ='$49/mo';
// cardImage.className ='card__image';
// cardPhoto.src ='https://picsum.photos/640/426';
// cardPhoto.setAttribute("alt", "random image");
// cardTitle.className ='card__title';
// cardTitle.innerText ='Keeping the dream alive by traveling the world.';
// cardParagraph.className ='card__paragraph';
// cardParagraph.innerText = 'Integrate the latest technologies with an innovative platform...';
// cardFooter.className ='card__footer';
// cardSign.className ='card__sign';
// cardAvatar.src ='https://randomuser.me/';
// cardAvatar.setAttribute("alt", "random avatar image"),
// cardName.className ='card__name';
// cardName.innerText ='ALIVE COOPER';
// cardDate.className ='card__date';
// cardDate.innerText ='MAY 02';
// cardBtn.className ='card__btn';
// cardLink.className ='card__link';
// cardLink.setAttribute("href", "#");
// cardLink.innerText = 'Load more';
// cardArrow.src ="./assets/arrow.png";


// bodyElement.appendChild(cardElement);
// cardElement.append(cardImage, cardPhoto);



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





