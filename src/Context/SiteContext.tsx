import * as React from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {IContextProps} from "../types/IContextProps";
import {ISiteState} from "../types/ISiteState";
import {ICategory} from "../types/ICategory";
import {ITag} from "../types/ITag";
import {apiContext} from "./ApiContext";
import {useNavigate} from "react-router-dom";

export const siteContext = createContext<any>({});

const SiteContext = (props: IContextProps) => {
    const navigate = useNavigate()

    const [siteState, setSiteState] = useState<ISiteState | null>(null)
    const [siteCategoryList, setSiteCategoryList] = useState<ICategory[] | null>(null) //нужно теперь хранить для Back элемента
    const [siteTagList, setSiteTagList] = useState<ITag[] | null>(null) //то же самое
    const [suggestedNews, setSuggestedNews] = useState<number[] | null>(null)

    const fetchCategories = useContext(apiContext).fetchCategories
    const fetchTags = useContext(apiContext).fetchTags
    const fetchSuggestedNews = useContext(apiContext).fetchSuggestedNews

    const setStateWithCheck = (state: ISiteState) => {
        if (!(state?.category || state?.tag || state?.search)) {
            setSiteState(null)
            goHome()
        } else {
            setSiteState(state)
        }
    }

    const chooseCategory = (category: number) => {
        setSiteState({...siteState, category: category, isSingleArticle: null} as ISiteState)
    }

    const clearCategory = () => {
        setStateWithCheck({...siteState, category: null} as ISiteState)
    }

    const chooseTag = (tag: number) => {
        setSiteState({...siteState, tag: tag, isSingleArticle: null} as ISiteState)
    }

    const clearTag = () => {
        setStateWithCheck({...siteState, tag: null} as ISiteState)
    }

    const chooseSearchPhrase = (search: string) => {
        setStateWithCheck({...siteState, search: search, isSingleArticle: null} as ISiteState)
    }

    const clearSearchPhrase = () => {
        setStateWithCheck({...siteState, search: null} as ISiteState)
    }

    const setSingleArticle = () => {
        setSiteState({isSingleArticle: true} as ISiteState)
    }

    const clearSingleArticle = () => {
        setSiteState(null)
    }

    const goHome = () => {
        setSiteState(null)
        navigate("/")
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
            if (!siteState.isSingleArticle) {
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
            }
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
        setSingleArticle,
        clearSingleArticle,
        siteCategoryList,
        siteTagList,
        goHome
    }

    return (
        <siteContext.Provider value={value}> {props.children} </siteContext.Provider>
    )
}

export default SiteContext