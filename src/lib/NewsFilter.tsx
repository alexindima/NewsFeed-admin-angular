import {Article} from "../types/Article";

interface INewsFilterProps {
    articles: Article[],
    ignoredCategories: number[],
    ignoredTags: number[],
    categoryToShow?: number
    tagToShow?: number
}

const NewsFilter = (params: INewsFilterProps) => {
    const articles = params.articles;
    const ignoredCategories = params.ignoredCategories;
    const ignoredTags = params.ignoredTags;
    const categoryToShow = params.categoryToShow
    const tagToShow = params.tagToShow

    return articles.filter((item) => {
        const articleCategory = item.category;
        const articleTags = item.tags;

        let ignored = !!(categoryToShow && (categoryToShow !== articleCategory));


        if (!ignored && tagToShow) {
            ignored = !isContainTag(articleTags, tagToShow)
        }

        if (!ignored) {
            ignored = isContainCategories(articleCategory, ignoredCategories)
        }

        if (!ignored) {
            ignored = isContainTags(articleTags, ignoredTags)
        }
        return !ignored;
    });
};

const isContainElementInArray = (array: number[], element: number) => {
    return array.indexOf(element) !== -1;
}

const isContainTag = (articleTags: number[], tag: number) => {
    return articleTags.indexOf(tag) !== -1;
}

const isContainTags = (articleTags: number[], tags: number[]) => {
    let isContains = false;
    articleTags.every((articleTag) => {
        isContains = isContainElementInArray(tags, articleTag)
        return !isContains;
    });
    return isContains;
}

const isContainCategories = (articleCategory: number, categories: number[]) => {
    let isContains = false;
    categories.every((category) => {
        if (category === articleCategory) {
            isContains = true;
            return false;
        }
        return true;
    });
    return isContains
}

export default NewsFilter;