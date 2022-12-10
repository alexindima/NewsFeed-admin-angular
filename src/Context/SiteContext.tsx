import * as React from "react";
import {createContext, useRef, useState} from "react";
import {IContextProps} from "../types/IContextProps";
import {ISiteState} from "../types/ISiteState";
import {ICategory} from "../types/ICategory";

export const siteContext = createContext<any>({});

const SiteContext = (props: IContextProps) => {
    const [siteState, setSiteState] = useState<ISiteState | null>(null)

    const [siteCategoryList, setSiteCategoryList] = useState<ICategory[] | null>(null) //нужно теперь хранить для Back элемента
    const currentPage = useRef(1)

    const setStateWithCheck = (state: ISiteState) => {
        if (!(state?.category || state?.tag || state?.search || state?.article)) {
            setSiteState(null)
        } else {
            setSiteState(state)
        }
    }

    const chooseCategory = (category: number) => {
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

    const setSiteCategories = (list: ICategory[]) => {
        setSiteCategoryList(list)
    }

    const value = {
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
        siteCategoryList,
        setSiteCategories,
        clearAll
    }

    return (
        <siteContext.Provider value={value}> {props.children} </siteContext.Provider>
    )
}

export default SiteContext