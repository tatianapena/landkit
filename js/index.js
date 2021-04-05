import * as apiService from './services/api.js';
import * as html from './htmlController.js';
import * as listeners from './listeners.js';
import * as utils from './utils.js';

window.stickyHeader = document.querySelector(".js-sticky");
window.result = document.querySelector(".js-totalResults");
window.searchInput = document.querySelector(".js-search");
window.loadButton = document.querySelector(".js-loadMoreBtn");
window.favoritesBtn = document.querySelector("a.js-favoritesBtn");
window.articlesBtn = document.querySelector("a.js-articlesBtn");
window.cardsContainer = document.querySelector(".js-cardsContainer");

window.articlesService = new apiService.ArticlesService();
window.htmlRender = new html.HtmlController(cardsContainer, result);

window.getAndRenderArticles = utils.getAndRenderArticles;

window.addEventListener('scroll', listeners.scrollController);
document.addEventListener("DOMContentLoaded", async function (e) {
    await listeners.domLoadedController(e);
});
searchInput.addEventListener('input', async (e) => { await listeners.searchInputController(e); });
loadButton.addEventListener('click', async (e) => { await listeners.clickLoadButtonController(e); });
favoritesBtn.addEventListener('click', async (e) => { await listeners.favoritesBtnController(e); });
articlesBtn.addEventListener('click', async (e) => { await listeners.articlesBtnController(e); });

// function getArticles(articlesData, query) {
//     const result = articlesData.splice(query.offset, query.limit);
//     query.offset += query.limit;
//     query.previousArticles.push(...result);
//
//     return result
// }

