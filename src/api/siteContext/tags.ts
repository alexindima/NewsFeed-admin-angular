import client from "./../client";

const TAGS_URL = `/tags`;

const fetchTags = () => client.get<number[] | null>(TAGS_URL);

const tagsApi = {
    fetchTags
};

export default tagsApi;