import * as React from "react";
import Header from "./Header/Header";
import Layout from "./Layout/Layout";
import Modal from "./Modal/Modal";

const App = () => {
    return (
        <div className="body-general">
            <Header />
            <Layout />
            <Modal />
        </div>
    )
}

export default App