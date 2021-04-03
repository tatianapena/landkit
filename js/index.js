const stickyHeader = document.querySelector(".js-sticky");
const result = document.querySelector(".js-totalResults");
const searchInput = document.querySelector(".js-search");
const loadButton = document.querySelector(".js-loadMoreBtn");

let queryInfo = {
  offset: 0,
  limit: 6,
  previousArticles: []
}

loadButton.addEventListener('click', getMoreArticles);
document.addEventListener("DOMContentLoaded", async function() {
  await getMoreArticles();
});

async function getMoreArticles() {
  const articlesData = await fetchData();
  getArticles(articlesData, queryInfo);
  createArticles(queryInfo.previousArticles);
}

function getArticles(articlesData, query) {
  const result = articlesData.splice(query.offset, query.limit);
  query.offset += query.limit;
  query.previousArticles.push(...result);

  return result
}

function createArticles(articlesData){
  const cardPrefix = "card__";
  const cardsContainer = document.querySelector(".js-cardsContainer");
  cardsContainer.innerHTML = '';
  articlesData.forEach(article => {
    cardsContainer.append(createArticle(cardPrefix, article));
  });
  result.innerHTML = `${articlesData.length} RESULTS`;
}

function createArticle(cardPrefix, article){
  const card = document.createElement("div")
  card.className = "card";

  card.append(createCardHeader(cardPrefix, article));
  card.append(createCardFooter(cardPrefix, article));

  return card;
}

function createCardHeader(cardPrefix, article) {
  const mainDiv = createElementWithClass("div", `${cardPrefix}header`)

  const favoriteDiv = createElementWithClass("div", `${cardPrefix}favorite`);

  let src = "./assets/Star.png";
  if (article.favorite !== undefined && article.favorite === true) {
    src = "./assets/Star-fill.png"
  }

  const imgAttributes = [{name: "src", value: src}, {name: "alt", value: "fill start"}];
  const imgFavorite = createElementWithClass("img", "card__star", imgAttributes);
  imgFavorite.classList.add("js-favoriteToggle")
  imgFavorite.addEventListener('click', async function (e) {
    await setFavorite(e.target, article)
  })
  favoriteDiv.append(imgFavorite);

  const priceDiv = createElementWithClass("div", "card__price");
  const pPrice = createElementWithClass("p", "card__value");
  pPrice.innerText = article.price;
  priceDiv.append(pPrice);

  const imageDiv = createElementWithClass("div", `${cardPrefix}image`);
  const imgAttributes2 = [{name: "src", value: article.image}, {name: "alt", value: "random image"}];
  const img = createElementWithClass("img", `${cardPrefix}photo`, imgAttributes2);
  imageDiv.append(img);

  const titleDiv = createElementWithClass("div", `${cardPrefix}title`);
  const textTitle = createElementWithClass("h2");
  textTitle.innerText = article.title;
  titleDiv.append(textTitle);

  const paragraphDiv = createElementWithClass("div", `${cardPrefix}paragraph`);
  const textParagraph = createElementWithClass("p");
  textParagraph.innerText = article.description;
  paragraphDiv.append(textParagraph);

  mainDiv.append(favoriteDiv, priceDiv, imageDiv, titleDiv, paragraphDiv);
  return mainDiv
}

function createCardFooter(cardPrefix, article) {
  const mainDiv = createElementWithClass("div", `${cardPrefix}footer`);

  const signDiv = createElementWithClass("div", `${cardPrefix}sign`);
  const imgAttrs = [
    {
      name: 'alt',
      value: 'random avatar image'
    },
    {
      name: 'src',
      value: article.avatar
    }
  ];
  const avatarImg = createElementWithClass("img", `${cardPrefix}avatar`, imgAttrs);
  const p = createElementWithClass("p", `${cardPrefix}name`);
  p.innerText = article.name;
  signDiv.append(avatarImg, p);

  const dateDiv = createElementWithClass("div", `${cardPrefix}date`);
  const time = createElementWithClass("time", "", [{name: 'dateTime', value: article.date}]);
  time.innerText = article.date;
  dateDiv.append(time);

  mainDiv.append(signDiv, dateDiv);
  return mainDiv;
}

function createElementWithClass(tagName, className, attributes) {
  const element = document.createElement(tagName);
  element.className = className;

  if (attributes !== undefined) {
    attributes.forEach(attribute => {
      element.setAttribute(attribute.name, attribute.value);
    });
  }

  return element;
}

async function searchInputChanged(e) {
  queryInfo = {
    offset: 0,
    limit: 6,
    previousArticles: [],
  }

  console.log(e.target.value);
  const data = await fetchData();
  const searchResult = search(e.target.value,data)
  createArticles(searchResult);
}

async function setFavorite(element, article) {
  const src = element.src.includes("fill") ? "Star" : "Star-fill";
  element.src = `./assets/${src}.png`;

  const isFavorite = element.src.includes("fill");
  await setArticleFavorite(article, isFavorite);
}

async function getFavorites(articlesData) {
  return articlesData.filter(article => article.favorite === true);
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

async function setArticleFavorite(article, isFavorite) {
  article.favorite = isFavorite;
  const xhr = new XMLHttpRequest();
  const url = `http://localhost:3000/articles/${article.id}`;
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 201) {
      const json = JSON.parse(xhr.responseText);
      console.log(json);
    }
  };
  const data = JSON.stringify(article);
  xhr.send(data);
}


// function for header sticky
window.onscroll = function() {stickyController()};
function stickyController() {
  const sticky = stickyHeader.offsetTop;
  if (window.pageYOffset > sticky) {
    stickyHeader.classList.add("sticky");
  } else {
    stickyHeader.classList.remove("sticky");
  }
}





