import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {OwnPropsType} from "./HeaderContainer";

type HeaderPropsType =OwnPropsType


export const Header = (props:HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://www.logodesign.net/images/nature-logo.png"/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
}