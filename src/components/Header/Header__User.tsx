import React, {useContext, useState} from "react";
import { BiUserCircle,} from 'react-icons/bi';
import { BiUserCheck } from 'react-icons/bi';
import { UserContext } from "../../Context/Context";
import classNames from "classnames";

const Header__User = () => {
    const [userIsClosed, setUserIsClosed] = useState(true)

    const userIsLogged = useContext(UserContext).userIsLogged;
    const userID = useContext(UserContext).user.current.id;
    const userName = useContext(UserContext).user.current.name;
    const logOut = useContext(UserContext).logOut;
    const openLoginModal =  useContext(UserContext).openLoginModal;

    function showOrHideCategory () {
        if (userIsLogged) {
            setUserIsClosed(!userIsClosed)
        }
    }
        console.log(userID)

    const userWindowClass = classNames({
        "icon-wrapper__popup": true,
        "hidden": userIsClosed,
    })
    console.log(userID)
    return (
        <div className="icon-wrapper" onClick={showOrHideCategory}>
            {userIsLogged || <BiUserCircle onClick={openLoginModal} id="user" className="icon-wrapper__img" title="User" />}
            {userIsLogged && <>
                <BiUserCheck id="user" className="icon-wrapper__img" title="User" />
                <div className={userWindowClass}>
                    <div className="category-dropdown">
                        <div>Hello, {userName}!</div>
                        <button className="category-dropdown__element" >Settings</button>
                        {(userID === 1) && <button className="category-dropdown__element" >Admin panel</button>}
                        <button onClick={logOut} className="category-dropdown__element" >Log Out</button>
                    </div>
                </div>
            </> }
        </div>

    )
}

export default Header__User