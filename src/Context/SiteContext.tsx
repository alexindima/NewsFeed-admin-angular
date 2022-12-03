import * as React from "react";
import {createContext, useEffect, useRef, useState} from "react";
import {IContextProps} from "../types/IContextProps";

export const siteContext = createContext<any>({});

const SiteContext = (props: IContextProps) => {
    const [currentCategory, setCurrentCategory] = useState("")
    const [currentTag, setCurrentTag]           = useState("")
    const [searchPhrase, setSearchPhrase]       = useState("")
    const [articleToShow, setArticleToShow]     = useState(0)

    let userDOM     = useRef<React.LegacyRef<HTMLDivElement>>(Object)
    let categoryDOM = useRef<React.LegacyRef<HTMLDivElement>>(Object)
    let currentPage = useRef(1)

    const setUserDOM = (DOM:React.LegacyRef<HTMLDivElement>) => {
        userDOM.current = DOM
    }
    const setCategoryDOM = (DOM:React.LegacyRef<HTMLDivElement>) => {
        categoryDOM.current = DOM
    }

    useEffect(() => {
        setArticleToShow(0)
    }, [currentCategory, currentTag, searchPhrase])

    const chooseCategory = (category:string) => {
        setCurrentCategory(category)
    }

    const clearCategory = () => {
        setCurrentCategory("")
        currentPage.current = 1
    }

    const chooseTag = (category:string) => {
        setCurrentTag(category)
    }

    const clearTag = () => {
        setCurrentTag("")
        currentPage.current = 1
    }

    const chooseSearchPhrase = (search:string) => {
        setSearchPhrase(search)
        currentPage.current = 1
    }

    const clearSearchPhrase = () => {
        setSearchPhrase("")
        currentPage.current = 1
    }

    const chooseArticleToShow = (id:number) => {
        clearAll()
        setArticleToShow(id)
    }

    const clearArticleToShow = () => {
        setArticleToShow(0)
        currentPage.current = 1
    }

    const clearAll = () => {
        setCurrentCategory("")
        setCurrentTag("")
        setSearchPhrase("")
        setArticleToShow(0)
        currentPage.current = 1
    }

    const setCurrentPage = (page:number) => {
        currentPage.current = page
    }

    const value = {
        setUserDOM,
        setCategoryDOM,
        currentCategory,
        chooseCategory,
        clearCategory,
        currentTag,
        chooseTag,
        clearTag,
        searchPhrase,
        chooseSearchPhrase,
        clearSearchPhrase,
        articleToShow,
        chooseArticleToShow,
        clearArticleToShow,
        currentPage,
        setCurrentPage,
        clearAll
    }

    return (
        <siteContext.Provider value={value} > {props.children} </siteContext.Provider>
    )
}

export default SiteContext