import React, {useContext} from "react";
import { BiUserCircle,} from 'react-icons/bi';
import { BiUserCheck } from 'react-icons/bi';
import { UserContext } from "../../Context/Context";

const Header__User = () => {
    const userIsLogged = useContext(UserContext).userIsLogged;
    const openLoginModal =  useContext(UserContext).openLoginModal;
    return (
        <div className="icon-wrapper">
            {userIsLogged && <BiUserCheck id="user" className="icon-wrapper__img" title="User" />}
            {userIsLogged || <BiUserCircle onClick={openLoginModal} id="user" className="icon-wrapper__img" title="User" />}
        </div>
    )
}

export default Header__User