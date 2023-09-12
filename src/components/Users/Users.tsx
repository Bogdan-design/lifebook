import React from 'react';
import styles from "./User.module.css";
import usersPhoto from "../../assets/imeges/avatar.jpg";
import {NavLink} from "react-router-dom";
import {UsersFromServerType} from "../../api/api";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: number[]
    onPageChanged: (p: number) => void
    users: UsersFromServerType[]
    follow: (id: number) => void
    unfollow: (id: number) => void
}

export const Users = (props: UsersPropsType) => {

    let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span
                        className={props.currentPage === p ? styles.selectedPage : ''}
                        onClick={() => {
                            props.onPageChanged(p)
                        }}>{p}
                    </span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small !== null ? u.photos.small : usersPhoto}
                                 className={styles.userPhoto}/>
                                </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollow(u.id)

                                }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id)

                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </div>)
            }
        </div>
    );
};

