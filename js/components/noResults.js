import {htmlToElement} from "./baseComponent.js";

class NoResults {
    constructor() {
    }

    render() {
        this.html = `  
            <section class="no-results container js-noResults">
               <div class="no-results__content">
                  <div class="no-results__title">
                     <h2 class="no-results__statement">Uh oh.</h2>
                  </div>
                  <div class="no-results__text">
                     <p class="no-results__phrase">We ran into an issue, but don't worry, we'll take care of it for sure.</p>
                  </div>
                  <div class="no-results__btn js-backBtn">
                     <a class="no-results__link search__link" href="#">Back to safety</a>
                  </div>
               </div>
               </div>
               <div class="no-results__image">
                  <img alt="girl working" class="no-results__photo" src="assets/girl.png">
               </div>
            </section>
        `

        return this;
    }

    toElement() {
        return htmlToElement(this.html);
    }

    backClickedHandler(cardsContainer) {
        const backBtn = cardsContainer.lastElementChild.getElementsByClassName("js-backBtn")[0];

        backBtn.addEventListener('click', async function (e) {
            cardsContainer.dispatchEvent(new CustomEvent('back', {
                bubbles: true,
                detail: {},
            }));
        });
    }
}

export {
    NoResults
}