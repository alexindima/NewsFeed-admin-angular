import * as React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import Header from "./Header/Header";
import Layout from "./Layout/Layout";
import Modal from "./Modal/Modal";
import UserContext from "../Context/UserContext";
import ModalContext from "../Context/ModalContext";
import SiteContext from "../Context/SiteContext";
import ApiContext from "../Context/ApiContext";

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
    )
}

export default App