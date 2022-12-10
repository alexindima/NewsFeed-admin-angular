import {IArticle} from "../types/IArticle";

const NewsFilter = (articles: IArticle[], ignoredCategories: number[], ignoredTags: string[], categoryToShow: number | null, tagToShow: string | null) => {
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
                if (tagToShow.toLowerCase() === articleTag.toLowerCase()) {
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
                    if (ignoredTag.toLowerCase() === articleTag.toLowerCase()) {
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