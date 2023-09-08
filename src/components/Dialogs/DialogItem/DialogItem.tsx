import React from "react";
import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogsType = {
    id: number
    name: string
}

export const DialogItem = (props:DialogsType) => {

    const path = "/dialogs/" + props.id

    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}


