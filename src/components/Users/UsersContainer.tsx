import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redaxStore";
import {
    follow,
    InitialStateType,
    requestUsers,
    setCurrentPage,
    toggleFollowingInProgress,
    unfollow,
} from "../../redux/usersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {UsersFromServerType} from "../../api/api";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {stat} from "fs";

type MapStatePropsType = InitialStateType
type UsersAPIComponentPropsType = {
    users: UsersFromServerType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: UsersFromServerType[]) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingInProgress: (id: number, isFetching: boolean) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}


class UsersContainer extends React.Component<UsersAPIComponentPropsType, InitialStateType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}

            />
        </>
    }
}


// const mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingInProgress, requestUsers}),
)(UsersContainer)


