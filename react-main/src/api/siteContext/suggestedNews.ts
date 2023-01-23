import client from "../client";

const SUGGESTED_URL = `/suggestedNews`;

const fetchSuggestedNews = () => client.get<number[] | null>(SUGGESTED_URL);

const suggestedNewsApi = {
    fetchSuggestedNews: fetchSuggestedNews
};

export default suggestedNewsApi;