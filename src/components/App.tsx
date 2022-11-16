import * as React from "react";
import { Header } from "./Header/Header";
import { Layout } from "./Layout/Layout";
import { Modal } from "./Modal/Modal";

export function App (){
    return (
        <div className="body-general">
            <Header />
            <Layout />
            <Modal />
        </div>
    )
}