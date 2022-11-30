import * as React from "react";
import {createContext, useState} from "react";
import {IContextProps} from "../types/IContextProps";

export const siteContext = createContext<any>({});

const SiteContext = (props: IContextProps) => {
    const [currentCategory, setCurrentCategory] = useState("")
    const [currentTag, setCurrentTag]           = useState("")
    const [searchPhrase, setSearchPhrase]       = useState("")

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

    const value = {
        currentCategory,
        chooseCategory,
        clearCategory,
        currentTag,
        chooseTag,
        clearTag,
        searchPhrase,
        chooseSearchPhrase,
        clearSearchPhrase
    }

    return (
        <siteContext.Provider value={value} > {props.children} </siteContext.Provider>
    )
}

export default SiteContext