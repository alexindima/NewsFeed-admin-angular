import React, {useContext, useRef, useState} from "react";
import { BiUserCircle,} from 'react-icons/bi';
import { BiUserCheck } from 'react-icons/bi';
import { userContext } from "../../Context/UserContext";
import {modalContext} from "../../Context/ModalContext";
import classNames from "classnames";

const User = () => {
    const [userIsClosed, setUserIsClosed] = useState(true)

    const helloUserDOM = useRef(null)

    const userID                = useContext(userContext).userID;
    const userName              = useContext(userContext).userName;
    const logOut                = useContext(userContext).logOut;
    const openLoginModal        = useContext(modalContext).openLoginModal;
    const openSettingsMainModal = useContext(modalContext).openSettingsMainModal;

    const showOrHideUser = (event: React.MouseEvent<HTMLDivElement>) => {
        if (userID && (event.target !== helloUserDOM.current)) {
            setUserIsClosed(!userIsClosed)
        }
    }

    const userWindowClass = classNames({
        "icon-wrapper__popup": true,
        "hidden": userIsClosed,
    })

    return (
        <div className="icon-wrapper" onClick={(event) => {showOrHideUser(event)}}>
            {!!userID || <BiUserCircle onClick={openLoginModal} id="user" className="icon-wrapper__img" title="User" />}
            {!!userID && <>
                <BiUserCheck className="icon-wrapper__img" title="User" />
                <div className={userWindowClass}>
                    <div className="category-dropdown">
                        <div ref={helloUserDOM} className="category-dropdown__name">Hello, {userName}!</div>
                        <button onClick={openSettingsMainModal} className="category-dropdown__element" >Settings</button>
                        {(userID === 1) && <button className="category-dropdown__element" >Admin panel</button>}
                        <button onClick={logOut} className="category-dropdown__element category-dropdown__element--reset" >Log Out</button>
                    </div>
                </div>
            </> }
        </div>

    )
}

export default User