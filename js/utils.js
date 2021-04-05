export async function getAndRenderArticles() {
    const articlesData = await articlesService.getArticles();
    htmlRender.renderArticlesCards(articlesData);
}