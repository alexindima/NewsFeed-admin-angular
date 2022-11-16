import React from "react";
import { Modal__User } from "./Modal__User";
import "./Modal.scss"
import classNames from "classnames";

// нужен рефакторинг классов
export function Modal () {
    const modalClass = classNames({
        "modal-area": true,
        "hidden": true,
    })
    return (
        <div id="modalAuth" className={modalClass}>
            <div className="modal-window">
                <div className="modal-window__close close-wrapper" >
                    <i id="modal-close" className="fa-regular fa-circle-xmark close-wrapper__img" title="Close"></i>
                </div>
                <Modal__User />
            </div>
        </div>
        )
}