import client from "./client";
import {User} from "../types/User";

const USERS_URL = `/users`;

const fetchAllUsers = () => client.get<User[] | null>(USERS_URL);
const fetchUser = (id: number) => client.get<User | null>(`${USERS_URL}/${id}`);
const createUser = (user: User) => client.post<User>(USERS_URL, user);
const changeUser = (id: number, user: User) => client.put<User>(`${USERS_URL}/${id}`, user);

const usersApi = {
    fetchAllUsers,
    fetchUser: fetchUser,
    createUser: createUser,
    changeUser: changeUser
};

export default usersApi;