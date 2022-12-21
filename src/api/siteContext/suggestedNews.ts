import client from "./../client";

const SUGGESTED_URL = `/suggestedNews`;

const fetchSuggestedNews = () => client.get<number[] | null>(SUGGESTED_URL);

export default {
    fetchSuggestedNews
};
