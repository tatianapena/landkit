import {ArticleCard} from './components/articleCard.js';
import {NoResults} from './components/noResults.js';
import {FullArticle} from "./components/fullArticle.js";
import {LoadMore} from "./components/loadMore.js";

export class HtmlController {
    constructor(cardsContainer, totalResultsContainer) {
        this.cardsContainer = cardsContainer;
        this.totalResultsContainer = totalResultsContainer;
        this.results = document.querySelector(".js-results");

        this.favoritesBtn = document.querySelector("a.js-favoritesBtn");
        this.contentSpace = document.querySelector(".js-contentSpace");
        this.searchContainer = document.querySelector(".js-searchContainer");
        this.mainContainer = document.querySelector(".js-mainContainer");
        this.loadMoreExists = false;
    }

    renderArticlesCards(articlesData, appendArticles = false) {
        if (!appendArticles) {
            this.cardsContainer.innerHTML = '';
        }

        if (articlesData.length === 0) {
            this.addNoResults();
        } else {
            this.contentSpace.innerHTML = '';
            this.articlesData = articlesData;
            articlesData.forEach(article => {
                this.setSearchVisible(true);
                const articleComponent = new ArticleCard(article, this);
                this.cardsContainer.append(articleComponent.render().toElement());
                articleComponent.favoriteElementClickedHandler(this.cardsContainer);
                articleComponent.expandArticleClickedHandler(this.cardsContainer);
            });

            this.addLoadMore();
        }

        this.setTotalResultsNumber(articlesData.length, this.totalResultsContainer);
    }

    setTotalResultsNumber(totalArticlesData, resultsContainer) {
        let text = "NO RESULTS";
        if (totalArticlesData !== 0) {
            text = `${totalArticlesData} RESULTS`;
        } else {
            this.addNoResults()
        }

        resultsContainer.innerHTML = text;
    }

    addNoResults() {
        const noResults = new NoResults();
        this.contentSpace.innerHTML = '';
        this.contentSpace.append(noResults.render().toElement());
        this.setSearchVisible(true);
        noResults.backClickedHandler(this.contentSpace);
        this.addLoadMore(true);
    }

    setFullArticle(article) {
        const fullView = new FullArticle(article);
        this.setSearchVisible(false);
        this.contentSpace.innerHTML = '';
        this.cardsContainer.innerHTML = '';
        this.contentSpace.append(fullView.render().toElement());
        this.addLoadMore(true);
    }

    addLoadMore(remove = false) {
        if (remove && this.loadMoreExists) {
            const loadMore = document.querySelector(".js-loadMoreBtn");
            this.mainContainer.removeChild(loadMore);
            this.loadMoreExists = false;
        }

        if (remove || this.loadMoreExists) {
            return
        }

        this.loadMoreExists = true;
        const loadMoreComponent = new LoadMore();
        this.mainContainer.append(loadMoreComponent.render().toElement());
        loadMoreComponent.loadMoreClickedHandler(this.cardsContainer);
    }

    setSearchVisible(visible = true) {
        this.searchContainer.style.display = visible ? "block" : "none";
    }
}

        