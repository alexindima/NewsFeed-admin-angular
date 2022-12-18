import { IArticle } from '../types/IArticle';

// уж больно большая функция, можно разделить на мелкие подфункции, чтобы было проще читать и поддерживать. Плюс скорее всего у тебя и алгоритм изменится (надеюсь)
// Сделай лучше вместо 5 параметров 1 параметр - объект, так проще поддерживать и управлять параметрами будет
const NewsFilter = (
    articles: IArticle[],
    ignoredCategories: number[],
    ignoredTags: number[],
    categoryToShow: number | null = null,
    tagToShow: number | null = null) => {
    return articles.filter(item => {
        // старайся избегать отрицания в названиях переменных. В чем проблема использовать просто ignored,
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
                        // страшная вложеность
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
