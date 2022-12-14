import * as React from "react";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import {IContextProps} from "../types/IContextProps";
import {ISiteState} from "../types/ISiteState";
import {ICategory} from "../types/ICategory";
import {ITag} from "../types/ITag";
import {apiContext} from "./ApiContext";
import {useLocation, useNavigate} from "react-router-dom";

export const siteContext = createContext<any>({});

const SiteContext = (props: IContextProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [siteState, setSiteState] = useState<ISiteState | null>(null)

    const [siteCategoryList, setSiteCategoryList] = useState<ICategory[] | null>(null) //нужно теперь хранить для Back элемента
    const [siteTagList, setSiteTagList] = useState<ITag[] | null>(null) //то же самое
    const [suggestedNews, setSuggestedNews] = useState<number[] | null>(null)

    const currentPage = useRef(1)

    const fetchCategories = useContext(apiContext).fetchCategories
    const fetchTags = useContext(apiContext).fetchTags
    const fetchSuggestedNews = useContext(apiContext).fetchSuggestedNews

    const setStateWithCheck = (state: ISiteState) => {
        if (!(state?.category || state?.tag || state?.search)) {
            setSiteState(null)
        } else {
            setSiteState(state)
        }
    }

    const chooseCategory = (category: number) => {
        setSiteState({...siteState, category: category} as ISiteState)
    }

    const clearCategory = () => {
        setStateWithCheck({...siteState, category: null} as ISiteState)
        currentPage.current = 1
    }

    const chooseTag = (tag: number) => {
        setSiteState({...siteState, tag: tag} as ISiteState)
    }

    const clearTag = () => {
        setStateWithCheck({...siteState, tag: null} as ISiteState)
        currentPage.current = 1
    }

    const chooseSearchPhrase = (search: string) => {
        setSiteState({...siteState, search: search} as ISiteState)
        currentPage.current = 1
    }

    const clearSearchPhrase = () => {
        setStateWithCheck({...siteState, search: null} as ISiteState)
        currentPage.current = 1
    }

    const clearAll = () => {
        setSiteState(null)
        currentPage.current = 1
    }

    const setCurrentPage = (page: number) => {
        currentPage.current = page
    }

    useEffect(() => {
        const fetch = async () => {
            const list = await fetchCategories()
            setSiteCategoryList(list)
        }
        fetch()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const list = await fetchTags()
            setSiteTagList(list)
        }
        fetch()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const news = await fetchSuggestedNews()
            setSuggestedNews(news)
        }
        fetch()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (siteState) {
            let query = ""
            if (siteState?.category) {
                query += "category=" + siteState.category
            }
            if (siteState?.tag) {
                if (query) query += '&'
                query += "tag=" + siteState.tag
            }
            if (siteState?.search) {
                if (query) query += '&'
                query += "search=" + siteState.search
            }
            navigate(`/?${query}`)
        } else {
            const clearQueryParams = () => {
                const currentUrl = location.pathname
                const newUrl = currentUrl.split('?')[0]
                navigate(newUrl, {replace: true})
            }
            clearQueryParams()
        }
        // eslint-disable-next-line
    }, [siteState])

    const value = {
        siteState,
        setSiteState,
        suggestedNews,
        chooseCategory,
        clearCategory,
        chooseTag,
        clearTag,
        chooseSearchPhrase,
        clearSearchPhrase,
        currentPage,
        setCurrentPage,
        siteCategoryList,
        siteTagList,
        clearAll
    }

    return (
        <siteContext.Provider value={value}> {props.children} </siteContext.Provider>
    )
}

export default SiteContext