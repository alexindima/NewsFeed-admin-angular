import * as React from "react";
import Header from "./Header/Header";
import Layout from "./Layout/Layout";
import Modal from "./Modal/Modal";
import Context from "../Context/Context";


const App = () => {

    return (
        <Context>
            <div className="body-general">
                <Header />
                <Layout />
                <Modal />
            </div>
        </Context>

    )
}

export default App