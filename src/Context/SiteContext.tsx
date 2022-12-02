import * as React from "react";
import {createContext, useEffect, useState} from "react";
import {IContextProps} from "../types/IContextProps";

export const siteContext = createContext<any>({});

const SiteContext = (props: IContextProps) => {
    const [currentCategory, setCurrentCategory] = useState("")
    const [currentTag, setCurrentTag]           = useState("")
    const [searchPhrase, setSearchPhrase]       = useState("")
    const [articleToShow, setArticleToShow]     = useState(0)

    useEffect(() => {
        setArticleToShow(0)
    }, [currentCategory, currentTag, searchPhrase])

    const chooseCategory = (category:string) => {
        setCurrentCategory(category)
    }

    const clearCategory = () => {
        setCurrentCategory("")
    }

    const chooseTag = (category:string) => {
        setCurrentTag(category)
    }

    const clearTag = () => {
        setCurrentTag("")
    }

    const chooseSearchPhrase = (search:string) => {
        setSearchPhrase(search)
    }

    const clearSearchPhrase = () => {
        setSearchPhrase("")
    }

    const chooseArticleToShow = (id:number) => {
        clearAll()
        setArticleToShow(id)
    }

    const clearArticleToShow = () => {
        setArticleToShow(0)
    }

    const clearAll = () => {
        setCurrentCategory("")
        setCurrentTag("")
        setSearchPhrase("")
        setArticleToShow(0)
    }

    const value = {
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
        clearAll
    }

    return (
        <siteContext.Provider value={value} > {props.children} </siteContext.Provider>
    )
}

export default SiteContext