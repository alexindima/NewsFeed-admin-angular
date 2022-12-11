import * as React from "react";
import {createContext} from "react";
import {IContextProps} from "../types/IContextProps";
import axios from "axios";
import {IUser} from "../types/IUser";

export const apiContext = createContext<any>({});

const ApiContext = (props: IContextProps) => {

    const fetchSuggestedNews = async () => {
        const result = await axios.get('http://localhost:3030/suggestedNews')
        return result.data
    }

    const fetchAllArticles = async () => {
        const result = await axios.get('http://localhost:3030/articles')
        return result.data
    }

    const fetchPagedArticles = async (page: number, limit: number, search: string | null = null) => {
        let url = 'http://localhost:3030/articles?'
        if (search) {
            url += `q=${search.replace(/ /g, '+')}&`
        }
        url += `_page=${page}&_limit=${limit}`
        const result = await axios.get(url)
        return result.data
    }

    const fetchOneArticle = async (id: number) => {
        const result = await axios.get(`http://localhost:3030/articles/${id}`)
        return result.data
    }

    const fetchCategories = async () => {
        const result = await axios.get('http://localhost:3030/categories')
        return result.data
    }

    const fetchTags = async () => {
        const result = await axios.get('http://localhost:3030/tags')
        return result.data
    }

    const fetchAllUsers = async () => {
        const result = await axios.get('http://localhost:3030/users')
        return result.data
    }

    const fetchUser = async (id: number) => {
        await axios.get(`http://localhost:3030/users/${id}`)
    }

    const createUser = async (user: IUser) => {
        await axios.post(`http://localhost:3030/users`, user)
    }

    const changeUser = async (id: number, user: IUser) => {
        await axios.put(`http://localhost:3030/users/${id}`, user)
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