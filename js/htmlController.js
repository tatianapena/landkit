export class HtmlController {
    constructor(cardsContainer, totalResultsContainer) {
        this.cardsContainer = cardsContainer;
        this.totalResultsContainer = totalResultsContainer;

        this.loadButton = document.querySelector(".js-loadMoreBtn");
        this.favoritesBtn = document.querySelector("a.js-favoritesBtn");
        this.articlesBtn = document.querySelector("a.js-articlesBtn");
        this.prefixCard = "card__";
        this.articlesData = [];
    }

    renderArticlesCards(articlesData) {
        this.cardsContainer.innerHTML = '';
        this.articlesData = articlesData;
        articlesData.forEach(article => {
            this.cardsContainer.append(createArticle(this, article))
        });

        setTotalResultsNumber(articlesData.length, this.totalResultsContainer);
    }
}


function setTotalResultsNumber(totalArticlesData, resultsContainer) {
    let text = "NO RESULTS";
    if (totalArticlesData !== 0) {
        text = `${totalArticlesData} RESULTS`;
    }

    resultsContainer.innerHTML = text;
}

function createArticle(htmlController, article){
    const card = document.createElement("div")
    card.className = "card";

    card.append(createCardHeader(htmlController, article));
    card.append(createCardFooter(htmlController, article));

    return card;
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

function createCardHeader(htmlController, article) {
    const cardPrefix = htmlController.prefixCard;
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
        const isFavorite = await setFavorite(htmlController, e.target, article.id)

        htmlController.cardsContainer.dispatchEvent(new CustomEvent('favorite', {
            bubbles: true,
            detail: {
                article: () => article,
                isFavorite: () => isFavorite
            }
        }));

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
    const textTitle = createElementWithClass("h2", "");
    textTitle.innerText = article.title;
    titleDiv.append(textTitle);

    const paragraphDiv = createElementWithClass("div", `${cardPrefix}paragraph`);
    const textParagraph = createElementWithClass("p");
    textParagraph.innerText = article.description;
    paragraphDiv.append(textParagraph);

    mainDiv.append(favoriteDiv, priceDiv, imageDiv, titleDiv, paragraphDiv);
    return mainDiv
}

function createCardFooter(htmlController, article) {
    const cardPrefix = htmlController.prefixCard;
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

async function setFavorite(htmlController, element, articleID) {
    const src = element.src.includes("fill") ? "Star" : "Star-fill";
    element.src = `./assets/${src}.png`;

    const isFavorite = element.src.includes("fill");

    // Hide if is in the favorite page and the card was unset
    if (!isFavorite && htmlController.favoritesBtn.classList.contains("menu__link--active")) {
        htmlController.articlesData = htmlController.articlesData.filter(article => article.id !== articleID)
        setTotalResultsNumber(htmlController.articlesData.length, htmlController.totalResultsContainer);
        element.parentNode.parentNode.parentNode.remove();
    }

    return isFavorite;
}