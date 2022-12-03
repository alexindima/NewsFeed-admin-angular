import * as React from "react";
import Header from "./Header/Header";
import Layout from "./Layout/Layout";
import Modal from "./Modal/Modal";
import UserContext from "../Context/UserContext";
import ModalContext from "../Context/ModalContext";
import SiteContext from "../Context/SiteContext";

const App = () => {
    return (
        <UserContext>
            <ModalContext>
                <SiteContext>
                    <div className="body-general">
                        <Header />
                        <Layout />
                        <Modal />
                    </div>
                </SiteContext>
            </ModalContext>
        </UserContext>
    )
}

export default App