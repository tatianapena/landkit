import {FullArticle} from "./components/fullArticle.js";

function updateActiveLink(previousActiveElement, newActiveElement) {
    previousActiveElement.classList.replace("menu__link--active", "menu__link")
    newActiveElement.classList.replace("menu__link", "menu__link--active")
}

const domLoadedController = async (e) => {
    await window.getAndRenderArticles();

    cardsContainer.addEventListener('favorite', async (e) => {
        const isFavorite = e.detail.isFavorite();
        const article = e.detail.article()
        await articlesService.updateFavoriteArticle(article.id, isFavorite);
    });

    cardsContainer.addEventListener('expand', function (e) {
        htmlRender.setFullArticle(e.detail.article());
    });

    cardsContainer.addEventListener('loadMore', async function (e) {
        if (articlesBtn.classList.contains("menu__link--active")) {
            await window.getAndRenderArticles();
        } else {
            const favorites = await articlesService.getFavoritesArticles();
            htmlRender.renderArticlesCards(favorites, true);
        }
    });

    contentSpaceContainer.addEventListener('back', async function (e) {
        await getAndRenderArticles();
        updateActiveLink(favoritesBtn, articlesBtn);
    });
}

const scrollController = (e) => {
    const sticky = stickyHeader.offsetTop;
    if (window.pageYOffset > sticky) {
        stickyHeader.classList.add("sticky");
    } else {
        stickyHeader.classList.remove("sticky");
    }
}

const searchInputController = async (e) => {
    // TODO: Add the search to handle favorites search
    const searchResult = await articlesService.searchArticles(e.target.value);
    htmlRender.renderArticlesCards(searchResult);
}

const clickLoadButtonController = async (e) => {
    if (articlesBtn.classList.contains("menu__link--active")) {
        await window.getAndRenderArticles();
    } else {
        const favorites = await articlesService.getFavoritesArticles();
        htmlRender.renderArticlesCards(favorites, true);
    }
}

const favoritesBtnController = async (e) => {
    const isOnFavorite = e.target.classList.contains("menu__link--active");
    if (isOnFavorite) {
        return
    }

    updateActiveLink(articlesBtn, favoritesBtn);
    const favorites = await articlesService.getFavoritesArticles(true);
    htmlRender.renderArticlesCards(favorites);
}

const articlesBtnController = async (e) => {
    const isOnArticle = e.target.classList.contains("menu__link--active");
    if (isOnArticle) {
        return
    }

    articlesService.resetPage();
    updateActiveLink(favoritesBtn, articlesBtn);
    await getAndRenderArticles();
}

export {
    domLoadedController,
    scrollController,
    searchInputController,
    clickLoadButtonController,
    favoritesBtnController,
    articlesBtnController,
};