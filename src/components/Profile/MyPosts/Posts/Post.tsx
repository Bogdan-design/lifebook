import React from "react";
import s from "./Post.module.css"
import usersPhoto from "assets/imeges/avatar.jpg";

type PostsPropsType = {
    message: string
    likesCount: number
    avatar: string | undefined
}

export const Post = (props: PostsPropsType) => {
    return (
        <div className={s.content}>
            <div className={s.item}>
                <img alt={''}
                     src={props.avatar || usersPhoto}/>
                <span>{props.message}</span>
                <div>
                    <span>{props.likesCount}</span>
                </div>
            </div>
        </div>
    )
}