import * as React from "react";
import { Layout__Main } from "./Layout__Main";
import { Layout__Suggested } from "./Layout__Suggested";
import "./Layout.scss"

export function Layout () {
    return (
        <div className="layout">
            <Layout__Main />
            <Layout__Suggested />
        </div>
    )
}