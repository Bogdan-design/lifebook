import React from 'react';
import {UsersFromServerType} from "api/api";
import {Paginator} from "components/common/Paginator/Paginator";
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
    portionSize?: number

}

export const Users: React.FC<UsersPropsType> = ({
                                                    totalUsersCount,
                                                    pageSize,
                                                    currentPage,
                                                    followingInProgress,
                                                    onPageChanged,
                                                    users,
                                                    follow,
                                                    unfollow,
                                                    portionSize
                                                }) => {
    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       onPageChanged={onPageChanged} portionSize={portionSize}/>
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


