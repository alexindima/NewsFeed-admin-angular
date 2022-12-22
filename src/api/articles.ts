import client from "./client";
import {Article} from "../types/Article";

const ARTICLES_URL = `/articles`;
const fetchAllArticles = () => client.get<Article[] | null>(ARTICLES_URL);
const fetchPagedArticles = (
    page: string,
    limit: string,
    search: string | null = null
) => {
    let url = `${ARTICLES_URL}?`;
    if (search) {
        url += `q=${search.replace(/ /g, "+")}&`;
    }
    url += `_page=${page}&_limit=${limit}`;
    return client.get<Article[] | null>(url);
};
const fetchOneArticle = async (id: number) => client.get<Article | null>(`${ARTICLES_URL}/${id}`);


const articlesApi = {
    fetchAllArticles: fetchAllArticles,
    fetchPagedArticles: fetchPagedArticles,
    fetchOneArticle: fetchOneArticle
};

export default articlesApi;
