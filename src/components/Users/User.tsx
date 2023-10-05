import React from 'react';
import styles from "./User.module.css";
import usersPhoto from "../../assets/imeges/avatar.jpg";
import {NavLink} from "react-router-dom";
import {UsersFromServerType} from "api/api";

type UsersPropsType = {
    followingInProgress: number[]
    user: UsersFromServerType
    follow: (id: number) => void
    unfollow: (id: number) => void
}

export const User: React.FC<UsersPropsType> = ({
                                                   followingInProgress,
                                                   user,
                                                   follow,
                                                   unfollow
                                               }) => {
        return (
            <div>
                <span><div>
                            <NavLink to={'/profile/' + user.id}>
                                <img
                                    alt='photo'
                                    src={user.photos.small !== null ? user.photos.small : usersPhoto}
                                    className={styles.userPhoto}
                                />
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id)

                                }}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id)

                                }}>Follow</button>}
                        </div>
                </span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </div>)
    }

;
