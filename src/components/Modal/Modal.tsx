import React, {useContext} from "react";
import { RiCloseCircleLine } from "react-icons/ri"
import Modal__User from "./Modal__User";
import "./Modal.scss"
import classNames from "classnames";
import { UserContext } from "../../Context/Context";

// нужен рефакторинг классов
const Modal = () => {
    const loginModalIsOpened = useContext(UserContext).loginModalIsOpened
    const hideLoginModal =  useContext(UserContext).hideLoginModal;
    const modalClass = classNames({
        "modal-area": true,
        "hidden": !loginModalIsOpened,
    })
    return (
        <div className={modalClass}>
            <div className="modal-window">
                <div className="modal-window__close close-wrapper" >
                    <RiCloseCircleLine onClick={hideLoginModal} className="close-wrapper__img" title="Close"/>
                </div>
                <Modal__User />
            </div>
        </div>
    )
}

export default Modal