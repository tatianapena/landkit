import {htmlToElement} from "./baseComponent.js";

class LoadMore {
    constructor() {
    }

    render() {
        this.html = `
            <div class="card__btn js-loadMoreBtn">
               <a class="card__link" href="#">Load more</a>
               <div class="card__follow">
                  <img alt="arrow-right" class="card__arrow" src="./assets/arrow.png">
               </div>
            </div>
        `

        return this;
    }

    toElement() {
        return htmlToElement(this.html);
    }

    loadMoreClickedHandler(cardsContainer) {
        const loadMoreBtn = document.querySelector(".js-loadMoreBtn")
        loadMoreBtn.addEventListener('click', function (e) {
            cardsContainer.dispatchEvent(new CustomEvent('loadMore', {
                bubbles: true,
                detail: { }
            }));
        });
    }

}

export {
    LoadMore
}