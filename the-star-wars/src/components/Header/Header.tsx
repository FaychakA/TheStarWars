import React from 'react';
import {NavLink} from "react-router-dom";
import './Header.scss';

const Header = () => {

    return (
        <header className="header">
            <NavLink
                to="/"
                className="header__home"
            >
                Home
            </NavLink>
        </header>
    )
};

export default Header;
