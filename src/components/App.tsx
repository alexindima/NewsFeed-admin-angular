import * as React from "react";
import Header from "./Header/Header";
import Layout from "./Layout/Layout";
import Modal from "./Modal/Modal";
import {createContext, useRef} from "react";
import UserContext from "../Context/Context";


const App = () => {
    const User = useRef({
        name: "test",
        ignoredCategories: ["politics1", "sport1"],
        ignoredTags: ["death1", "cat1"]
    })

    return (
        <UserContext.Provider value={User}>
            <div className="body-general">
                <Header />
                <Layout />
                <Modal />
            </div>
        </UserContext.Provider>

    )
}

export default App