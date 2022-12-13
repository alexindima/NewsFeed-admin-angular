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
        <ApiContext>
            <UserContext>
                <ModalContext>
                    <SiteContext>
                        <Router>
                            <div className="body-general">
                                <Header/>
                                <Layout/>
                                <Modal/>
                            </div>
                        </Router>
                    </SiteContext>
                </ModalContext>
            </UserContext>
        </ApiContext>
    )
}

export default App