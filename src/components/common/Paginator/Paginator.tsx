import React from 'react';
import styles from "./Paginator.module.css";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
}

export const Paginator: React.FC<UsersPropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount: number = Math.ceil(totalUsersCount / pageSize)

    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div>
            {pages.map(p => {
                return <span
                    className={currentPage === p ? styles.selectedPage : ''}
                    onClick={() => {
                        onPageChanged(p)
                    }}>{p}
                    </span>
            })}
        </div>
    );
};

