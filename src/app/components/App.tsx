import * as React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./header/Header";
import Layout from "./layout/Layout";
import Modal from "./modal/Modal";
import UserContext from "../context/UserContext";
import ModalContext from "../context/ModalContext";
import SiteContext from "../context/SiteContext";
import ApiContext from "../context/ApiContext";

const App = () => {
    return (
        <Router>
            <ApiContext>
                <UserContext>
                    <ModalContext>
                        <SiteContext>
                            <div className="body-general">
                                <Header/>
                                <Layout/>
                                <Modal/>
                            </div>
                        </SiteContext>
                    </ModalContext>
                </UserContext>
            </ApiContext>
        </Router>
    );
};

export default App;
