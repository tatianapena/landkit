export class ArticlesService {
    constructor(baseUrl = "http://localhost:3000") {
        this.baseUrl = baseUrl;
        this.articlesEndpoint = this.baseUrl + "/articles";
        this.page = 1;
        this.limit = 6;
        this.totalArticles = [];
    }

    nextPage() {
        this.page += 1;
        return this;
    }

    resetPage() {
        this.page = 1;
        this.totalArticles = [];
        return this;
    }

    async getArticle(articleID) {
        const response = await fetch(`${this.articlesEndpoint}/${articleID}`);
        return response.json();
    }

    async getArticles(resetPage = false) {
        if (resetPage) {
            this.resetPage();
        }

        const page = this.page;
        const limit = this.limit;
        const response = await fetch(`${this.articlesEndpoint}/?_page=${page}&_limit=${limit}`);

        const json = await response.json();
        this.totalArticles.push(...json);
        this.nextPage();

        return this.totalArticles;
    }

    async getFavoritesArticles(resetPage = false) {
        if (resetPage) {
            this.resetPage();
        }

        const page = this.page;
        const limit = this.limit;

        const response = await fetch(`${this.articlesEndpoint}/?_page=${page}&_limit=${limit}&favorite=true`);
        const json = await response.json();
        this.totalArticles.push(...json);
        this.nextPage();

        return this.totalArticles;
    }

    async searchArticles(query, articles) {
        // We need to wrap our own search because json-server will search
        // on any property of the object. We only want to match with title
        // or description.

        if (articles === undefined) {
            articles = await this.getArticles(true);
        }

        const lowerQuery = query.toLowerCase();
        return articles.filter(article => {
            const description = article.description.toLowerCase();
            const title = article.title.toLowerCase();
            return description.includes(lowerQuery) || title.includes(lowerQuery);
        });
    }

    async searchArticlesInFavorites(query) {
        const favoritesArticles = await this.getFavoritesArticles(query);
        return await this.searchArticles(query, favoritesArticles);
    }

    async updateFavoriteArticle(articleID, isFavorite = true) {
        const xhr = new XMLHttpRequest();
        const url = `${this.articlesEndpoint}/${articleID}`;
        xhr.open("PATCH", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                const json = JSON.parse(xhr.responseText);
                console.log(json);
            }
        };
        const data = JSON.stringify({
            favorite: isFavorite
        });
        xhr.send(data);
    }
}
