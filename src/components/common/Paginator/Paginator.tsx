import React, {useState} from 'react';
import s from "./Paginator.module.css";
import cn from 'classnames'

type UsersPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    portionSize?: number

}

export const Paginator: React.FC<UsersPropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged,portionSize = 10}) => {

    const pagesCount: number = Math.ceil(totalItemsCount / pageSize)

    const pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount/portionSize)
    const [portionNumber,setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber-1) * portionSize+1
    const rightPortionPageNumber = portionNumber* portionSize


    return (
        <div className={s.pagination}>
            {portionNumber > 1 &&
            <button onClick={()=>{setPortionNumber(portionNumber-1)}}>prev</button>
            }
            {pages.filter(p=>p>=leftPortionPageNumber && p<=rightPortionPageNumber).map(p => {
                return <span
                    key={p}
                    className={cn({[s.selectedPage]:currentPage === p},s.pageNumber)}
                    onClick={() => {
                        onPageChanged(p)
                    }}>{p}
                    </span>
            })}
            {portionCount > portionNumber &&
                <button onClick={()=>{setPortionNumber(portionNumber+1)}}>next</button>
            }
        </div>
    );
};

