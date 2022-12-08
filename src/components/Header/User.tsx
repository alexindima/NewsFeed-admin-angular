import React, {useContext, useRef, useState} from "react";
import {BiUserCircle,} from 'react-icons/bi';
import {BiUserCheck} from 'react-icons/bi';
import {userContext} from "../../Context/UserContext";
import {modalContext} from "../../Context/ModalContext";
import classNames from "classnames";

const User = () => {
    const [userIsClosed, setUserIsClosed] = useState(true)

    const userDOM = useRef(null)
    const helloUserDOM = useRef(null)

    const user = useContext(userContext).user;
    const logOut = useContext(userContext).logOut;
    const openLoginModal = useContext(modalContext).openLoginModal;
    const openSettingsMainModal = useContext(modalContext).openSettingsMainModal;

    const showOrHideUser = (event: React.MouseEvent<HTMLDivElement>) => {
        if (user && (event.target !== helloUserDOM.current)) {
            setUserIsClosed(!userIsClosed)
        }
    }

    const userWindowClass = classNames({
        "icon-wrapper__popup": true,
        "hidden": userIsClosed,
    })

    return (
        <div ref={userDOM} className="icon-wrapper" onClick={(event) => {
            showOrHideUser(event)
        }}>
            {!!user || <BiUserCircle onClick={openLoginModal} id="user" className="icon-wrapper__img" title="User"/>}
            {!!user && <>
                <BiUserCheck className="icon-wrapper__img" title="User"/>
                <div className={userWindowClass}>
                    <div className="category-dropdown">
                        <div ref={helloUserDOM} className="category-dropdown__name">Hello, {user.name}!</div>
                        <button onClick={openSettingsMainModal} className="category-dropdown__element">Settings</button>
                        {(user.id === 1) && <button className="category-dropdown__element">Admin panel</button>}
                        <button onClick={logOut}
                                className="category-dropdown__element category-dropdown__element--reset">Log Out
                        </button>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default User