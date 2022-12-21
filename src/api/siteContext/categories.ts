import client from "./../client";

const CATEGORIES_URL = `/categories`;

const fetchCategories = () => client.get<number[] | null>(CATEGORIES_URL);

export default {
    fetchCategories
};
