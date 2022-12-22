import client from "./../client";

const CATEGORIES_URL = `/categories`;

const fetchCategories = () => client.get<number[] | null>(CATEGORIES_URL);

const categoriesAPI = {
    fetchCategories: fetchCategories
};

export default categoriesAPI;
