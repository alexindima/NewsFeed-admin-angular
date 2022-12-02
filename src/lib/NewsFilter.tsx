import {IArticle} from "../types/IArticle";

const NewsFilter = (articles:IArticle[], ignoredCategories:string[], ignoredTags:string[], tagToShow:string = "") => {
    return articles.filter(item => {
        let notIgnored = true
        const articleCategory = item.category
        const articleTags = item.tags

        if(tagToShow) {
            notIgnored = false
            articleTags.every(articleTag => {
                if (tagToShow.toLowerCase() === articleTag.toLowerCase()) {
                    notIgnored = true
                    return false
                }
                return true
            })
        }

        ignoredCategories.every(ignoredCategory => {
            if (ignoredCategory.toLowerCase() === articleCategory.toLowerCase()) {
                notIgnored = false
                return false
            }
            return true
        })

        ignoredTags.every(ignoredTag => {
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
    })
}

export default NewsFilter