import * as React from "react";
import {createContext} from "react";
import {IContextProps} from "../types/IContextProps";
import axios from "axios";
import {IUser} from "../types/IUser";

export const apiContext = createContext<any>({});

const ApiContext = (props: IContextProps) => {
    // А представь у тебя поменяется хост? Придется во всех 5 файлах менять.
    // Почему нельзя вынести http://localhost:3030 в отдельную переменную?
    const ARTICLES_URL = 'http://localhost:3030/articles'
    const SUGGESTED_URL = 'http://localhost:3030/suggestedNews'
    const CATEGORIES_URL = 'http://localhost:3030/categories'
    const TAGS_URL = 'http://localhost:3030/tags'
    const USERS_URL = 'http://localhost:3030/users'

    // Не уверен, что хранить все возможные запросы в одном месте норм идея, иначе всё превратится в свалку, погугли, должен быть подход лучше
    const fetchSuggestedNews = async () => {
        const result = await axios.get(SUGGESTED_URL)
        return result.data
    }

    const fetchAllArticles = async () => {
        const result = await axios.get(ARTICLES_URL)
        return result.data
    }

    const fetchPagedArticles = async (page: number, limit: number, search: string | null = null) => {
        let url = `${ARTICLES_URL}?`
        if (search) {
            url += `q=${search.replace(/ /g, '+')}&`
        }
        url += `_page=${page}&_limit=${limit}`
        const result = await axios.get(url)
        return result.data
    }

    // Не забывай про возвращаемое значение, интерфейсы и типы наше всё
    const fetchOneArticle = async (id: number) => {
        const result = await axios.get(`${ARTICLES_URL}/${id}`)
        return result.data
    }

    const fetchCategories = async () => {
        const result = await axios.get(CATEGORIES_URL)
        return result.data
    }

    const fetchTags = async () => {
        const result = await axios.get(TAGS_URL)
        return result.data
    }

    const fetchAllUsers = async () => {
        const result = await axios.get(USERS_URL)
        return result.data
    }

    const fetchUser = async (id: number) => {
        await axios.get(`${USERS_URL}/${id}`)
    }

    const createUser = async (user: IUser) => {
        await axios.post(USERS_URL, user)
    }

    const changeUser = async (id: number, user: IUser) => {
        await axios.put(`${USERS_URL}/${id}`, user)
    }

    const value = {
        fetchSuggestedNews,
        fetchAllArticles,
        fetchPagedArticles,
        fetchOneArticle,
        fetchCategories,
        fetchTags,
        fetchAllUsers,
        fetchUser,
        createUser,
        changeUser
    }

    return (
        <apiContext.Provider value={value}> {props.children} </apiContext.Provider>
    )
}

export default ApiContext
