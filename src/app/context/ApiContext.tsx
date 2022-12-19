import * as React from "react";
import {createContext} from "react";
import {ContextProps} from "../../types/ContextProps";
import axios from "axios";
import {User} from "../../types/User";
import {Article} from "../../types/Article";

interface IApiContext {
    fetchSuggestedNews: Function,
    fetchAllArticles: Function,
    fetchPagedArticles: Function,
    fetchOneArticle: Function,
    fetchCategories: Function,
    fetchTags: Function,
    fetchAllUsers: Function,
    fetchUser: Function,
    createUser: Function,
    changeUser: Function,
}

export const apiContext = createContext<IApiContext>({
    fetchSuggestedNews: () => {
    },
    fetchAllArticles: () => {
    },
    fetchPagedArticles: () => {
    },
    fetchOneArticle: () => {
    },
    fetchCategories: () => {
    },
    fetchTags: () => {
    },
    fetchAllUsers: () => {
    },
    fetchUser: () => {
    },
    createUser: () => {
    },
    changeUser: () => {
    },
});

const ApiContext = (props: ContextProps) => {
    const HOST_URL = "http://localhost:3030";

    const ARTICLES_URL = `${HOST_URL}/articles`;
    const SUGGESTED_URL = `${HOST_URL}/suggestedNews`;
    const CATEGORIES_URL = `${HOST_URL}/categories`;
    const TAGS_URL = `${HOST_URL}/tags`;
    const USERS_URL = `${HOST_URL}/users`;

    // Не уверен, что хранить все возможные запросы в одном месте норм идея, иначе всё превратится в свалку, погугли, должен быть подход лучше
    const fetchSuggestedNews = async () => {
        const result = await axios.get<number[] | null>(SUGGESTED_URL);
        return result.data;
    };

    const fetchAllArticles = async () => {
        const result = await axios.get<Article[] | null>(ARTICLES_URL);
        return result.data;
    };

    const fetchPagedArticles = async (
        page: number,
        limit: number,
        search: string | null = null
    ) => {
        let url = `${ARTICLES_URL}?`;
        if (search) {
            url += `q=${search.replace(/ /g, "+")}&`;
        }
        url += `_page=${page}&_limit=${limit}`;
        const result = await axios.get<Article[] | null>(url);
        return result.data;
    };

    const fetchOneArticle = async (id: number) => {
        const result = await axios.get<Article | null>(`${ARTICLES_URL}/${id}`);
        return result.data;
    };

    const fetchCategories = async () => {
        const result = await axios.get<number[] | null>(CATEGORIES_URL);
        return result.data;
    };

    const fetchTags = async () => {
        const result = await axios.get<number[] | null>(TAGS_URL);
        return result.data;
    };

    const fetchAllUsers = async () => {
        const result = await axios.get<User[] | null>(USERS_URL);
        return result.data;
    };

    const fetchUser = async (id: number) => {
        const result = await axios.get<User | null>(`${USERS_URL}/${id}`);
        return result.data;
    };

    const createUser = async (user: User) => {
        await axios.post<User>(USERS_URL, user);
    };

    const changeUser = async (id: number, user: User) => {
        await axios.put<User>(`${USERS_URL}/${id}`, user);
    };

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
        changeUser,
    };

    return (
        <apiContext.Provider value={value}>{props.children}</apiContext.Provider>
    );
};

export default ApiContext;
