import {IArticle} from "../types/IArticle";

const NewsFilter = (articles: IArticle[], ignoredCategories: number[], ignoredTags: number[], categoryToShow: number | null, tagToShow: number | null) => {
    return articles.filter(item => {
        let notIgnored = true
        const articleCategory = item.category
        const articleTags = item.tags

        if (categoryToShow && (categoryToShow !== articleCategory)) {
            notIgnored = false
        }

        if (notIgnored && tagToShow) {
            notIgnored = false
            articleTags.every(articleTag => {
                if (tagToShow === articleTag) {
                    notIgnored = true
                    return false
                }
                return true
            })
        }

        if (notIgnored) {
            ignoredCategories?.every(ignoredCategory => {
                if (ignoredCategory === articleCategory) {
                    notIgnored = false
                    return false
                }
                return true
            })
        }

        if (notIgnored) {
            ignoredTags?.every(ignoredTag => {
                articleTags.every(articleTag => {
                    if (ignoredTag === articleTag) {
                        notIgnored = false
                        return false
                    }
                    return true
                })
                return notIgnored
            })
            return notIgnored
        }
        return notIgnored
    })
}

export default NewsFilter