import {htmlToElement} from "./baseComponent.js";

class FullArticle {
    constructor(article) {
        this.article = article;
    }

    render() {
        const article = this.article;
        this.html = `
            <article class="article container">
               <div class ="article__title">
                  <h3 class="article__main-title">${article.title}</h3>
               </div>
               <div class="article__statement">
                  <p class="article__phrase">${article.description}</p>
               </div>
               <div class="article__info">
                  <div class="article__sign">
                     <div class="article__avatar">
                        <img class="article__girl-smiling" src="${article.avatar}" alt="avatar picture">
                     </div>
                     <div class="article__published">
                        <p class="article__name">${article.name}</p>
                        <p class="article__date">Published on <time datetime="2019-05-20"></time>${article.date}</p>
                     </div>
                  </div>
                  <div class=article__social>
                     <div class="article__quota">
                        <p class="article__share">SHARE:</p>
                     </div>
                     <ul class ="article__list">
                        <li class="article__item">
                           <a class="article__link" href="https://instagram.com" target="blank">
                           <img class="article__img" src="./assets/instagram.svg" alt="instagram logo">
                           </a>
                        </li>
                        <li class="article__item">
                           <a class="article__link" href="https://www.facebook.com" target="blank">
                           <img class="article__img" src="./assets/facebook.svg" alt="facebook logo">
                           </a>
                        </li>
                        <li class="article__item">
                           <a class="article__link" href="https://twitter.com" target="blank">
                           <img class="article__img" src="./assets/twitter.svg" alt="twitter logo">
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
               <div class="article__photo">
                  <img class="article__picture" src="${article.image}" alt="guy holding photos">
               </div>
               <div class="article__caption">
                  <p>${article.caption}</p>
               </div>
               <div class="article__text">
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                     <br>
                     <br>
                     Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </p>
               </div>
            </article>
        `

        return this;
    }

    toElement() {
        return htmlToElement(this.html);
    }

    updateArticle(article) {
        this.article = article;
    }
}

export {
    FullArticle
}