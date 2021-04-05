import { htmlToElement } from "./baseComponent.js";

class ArticleCard {
    constructor(article, htmlController) {
        this.article = article;
        this.htmlController = htmlController;
        this.body = document.body;

        this.favoriteSrc = article.favorite ?
            './assets/Star-fill.png' :
            './assets/Star.png';
    }

    render() {
        const article = this.article;
        this.html = `
            <div class="card js-card">
               <div class="card__header">
                  <div class="card__favorite">
                     <img class="card__star js-favoriteToggle" src="${this.favoriteSrc}" alt="fill start">
                  </div>
                  <div class="card__price">
                     <p class="card__value">${article.price}</p>
                  </div>
                  <div class="card__image">
                     <img class="card__photo" src="${article.image}" alt="random image">
                  </div>
                  <div class="card__title">
                     <h2 class="">${article.title}</h2>
                  </div>
                  <div class="card__paragraph">
                     <p class="undefined">${article.description}</p>
                  </div>
               </div>
               <div class="card__footer">
                  <div class="card__sign">
                     <img class="card__avatar" alt="random avatar image" src="${article.avatar}">
                     <p class="card__name">${article.name}</p>
                  </div>
                  <div class="card__date">
                     <time class="" datetime="January 21">${article.date}</time>
                  </div>
               </div>
            </div>
        `

        return this;
    }

    favoriteElementClickedHandler(cardsContainer) {
        const imgFavorite = cardsContainer.lastElementChild.getElementsByClassName("js-favoriteToggle")[0];
        const {article, htmlController } = this;

        imgFavorite.addEventListener('click', async function (e) {
            const isFavorite = await setFavorite(htmlController, e.target, article.id)

            cardsContainer.dispatchEvent(new CustomEvent('favorite', {
                bubbles: true,
                detail: {
                    article: () => article,
                    isFavorite: () => isFavorite
                }
            }));
        });
    }

    expandArticleClickedHandler(cardsContainer) {
        const card = cardsContainer.lastChild;
        const { article } = this;


        card.addEventListener('click', async function (e) {
            if (e.target.classList.contains('js-favoriteToggle')) {
                return;
            }

            cardsContainer.dispatchEvent(new CustomEvent('expand', {
                bubbles: true,
                detail: {
                    article: () => article
                }
            }));
        });
    }


    toElement() {
        return htmlToElement(this.html);
    }
}

async function setFavorite(htmlController, element, articleID) {
    const src = element.src.includes("fill") ? "Star" : "Star-fill";
    element.src = `./assets/${src}.png`;

    const isFavorite = element.src.includes("fill");

    // Hide if is in the favorite page and the card was unset
    if (!isFavorite && htmlController.favoritesBtn.classList.contains("menu__link--active")) {
        htmlController.articlesData = htmlController.articlesData.filter(article => article.id !== articleID)
        htmlController.setTotalResultsNumber(htmlController.articlesData.length, htmlController.totalResultsContainer);
        element.parentNode.parentNode.parentNode.remove();
    }

    return isFavorite;
}

export {
    ArticleCard
}