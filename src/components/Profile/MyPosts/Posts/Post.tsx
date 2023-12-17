import React from "react";
import s from "./Post.module.css"

type PostsPropsType = {
    message: string
    likesCount: number
}

export const Post = (props: PostsPropsType) => {
    return (
        <div className={s.content}>
            <div className={s.item}>
                <img alt={''}
                    src="https://cdn.vox-cdn.com/thumbor/W6YyHkPAoXd8VGz2OGMjqkWWM7E=/0x0:2370x1574/1400x1400/filters:focal(1185x787:1186x788)/cdn.vox-cdn.com/uploads/chorus_asset/file/20103707/Screen_Shot_2020_07_21_at_9.38.25_AM.png"/>
                <span>{props.message}</span>
                <div>
                    <span>{props.likesCount}</span>
                </div>
            </div>
        </div>
    )
}