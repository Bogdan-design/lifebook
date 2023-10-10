import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {OwnPropsType} from "./HeaderContainer";

type HeaderPropsType = OwnPropsType


export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <p style={{color:"blue",fontSize:'32px',fontWeight:"bold"}}>Lifebook</p>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login}-
                    <button onClick={props.logOutTC}>Log Out</button>
                </div> : <NavLink to={'/login'}><button>
                    Login
                </button>
                </NavLink>
                }
            </div>
        </header>
    )
}