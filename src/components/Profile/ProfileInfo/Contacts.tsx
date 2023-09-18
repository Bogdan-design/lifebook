import s from "./ProfileInfo.module.css";
import React from "react";

type ContactPropsType = {
    contactTitle: string
    contactValue:string
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>
        <b>{contactTitle}:</b>{contactValue}
    </div>
}