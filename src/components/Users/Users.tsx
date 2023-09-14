import React from 'react';
import styles from "./User.module.css";
import usersPhoto from "../../assets/imeges/avatar.jpg";
import {NavLink} from "react-router-dom";
import {UsersFromServerType} from "../../api/api";
import {Paginator} from "../../components/common/Paginator/Paginator";
import {User} from "./User";

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

export const Users: React.FC<UsersPropsType> = ({
                                                    totalUsersCount,
                                                    pageSize,
                                                    currentPage,
                                                    followingInProgress,
                                                    onPageChanged,
                                                    users,
                                                    follow,
                                                    unfollow
                                                }) => {
    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            <div>
                {
                    users.map(u =>
                        <User
                            key={u.id}
                            user={u}
                            followingInProgress={followingInProgress}
                            follow={follow} unfollow={unfollow}
                        />)}
            </div>
        </div>)

}


