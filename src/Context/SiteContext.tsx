import * as React from "react";
import {createContext, useRef, useState} from "react";
import {IContextProps} from "../types/IContextProps";
import {ISiteState} from "../types/ISiteState";

export const siteContext = createContext<any>({});

const SiteContext = (props: IContextProps) => {
    const [siteState, setSiteState] = useState<ISiteState | null>(null)

    let userDOM = useRef<React.LegacyRef<HTMLDivElement>>(Object)
    let categoryDOM = useRef<React.LegacyRef<HTMLDivElement>>(Object)
    let currentPage = useRef(1)

    const setUserDOM = (DOM: React.LegacyRef<HTMLDivElement>) => {
        userDOM.current = DOM
    }
    const setCategoryDOM = (DOM: React.LegacyRef<HTMLDivElement>) => {
        categoryDOM.current = DOM
    }

    const setStateWithCheck = (state: ISiteState) => {
        if (!(state?.category || state?.tag || state?.search || state?.article)) {
            setSiteState(null)
        } else {
            setSiteState(state)
        }
    }

    const chooseCategory = (category: string) => {
        setSiteState({...siteState, category: category, article: null} as ISiteState)
    }

    const clearCategory = () => {
        setStateWithCheck({...siteState, category: null} as ISiteState)
        currentPage.current = 1
    }

    const chooseTag = (tag: string) => {
        setSiteState({...siteState, tag: tag, article: null} as ISiteState)
    }

    const clearTag = () => {
        setStateWithCheck({...siteState, tag: null} as ISiteState)
        currentPage.current = 1
    }

    const chooseSearchPhrase = (search: string) => {
        setSiteState({...siteState, search: search, article: null} as ISiteState)
        currentPage.current = 1
    }

    const clearSearchPhrase = () => {
        setStateWithCheck({...siteState, search: null} as ISiteState)
        currentPage.current = 1
    }

    const chooseArticleToShow = (id: number) => {
        setSiteState({article: id} as ISiteState)
    }

    const clearArticleToShow = () => {
        setStateWithCheck({...siteState, article: null} as ISiteState)
        currentPage.current = 1
    }

    const clearAll = () => {
        setSiteState(null)
        currentPage.current = 1
    }

    const setCurrentPage = (page: number) => {
        currentPage.current = page
    }

    const value = {
        setUserDOM,
        setCategoryDOM,
        siteState,
        chooseCategory,
        clearCategory,
        chooseTag,
        clearTag,
        chooseSearchPhrase,
        clearSearchPhrase,
        chooseArticleToShow,
        clearArticleToShow,
        currentPage,
        setCurrentPage,
        clearAll
    }

    return (
        <siteContext.Provider value={value}> {props.children} </siteContext.Provider>
    )
}

export default SiteContext