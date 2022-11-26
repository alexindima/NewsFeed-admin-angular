const NewsFilter = (article, ignoredCategories, ignoredTags) => {
    return article.filter(item => {
        let notIgnored = true
        const articleCategory = item.category
        ignoredCategories.every(ignoredCategory => {
            if (ignoredCategory.trim().toLowerCase() === articleCategory.trim().toLowerCase()) {
                notIgnored = false
                return false
            }
            return true
        })
        const articleTags = item.tags.split(',')
        ignoredTags.every(ignoredTag => {
            articleTags.every(articleTag => {
                if (ignoredTag.trim().toLowerCase() === articleTag.trim().toLowerCase()) {
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