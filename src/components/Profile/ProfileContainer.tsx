import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redaxStore";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string

}
type PhotosType = {
    small: string | null
    large: string
}
export type ProfileContainerType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string,
    fullName: string
    userId: number | null
    photos: PhotosType
}
type PathParamsType = {
    userId: string
}
type MapDispatchPropsType = {
    getUserProfile: (id: number) => void
    getStatus: (id: number) => void
    updateStatus: (status: string) => void
}
type MapStatePropsType = {
    profile: ProfileContainerType | null,
    status: string
    authorizedUserId: number | null
}
type OwnPropsType = MapDispatchPropsType & MapStatePropsType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileContainer extends React.Component<PropsType, OwnPropsType> {


    componentDidMount() {
        let userId = Number(this.props.match.params.userId)
        if (!userId && this.props.authorizedUserId ) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)

        this.props.getStatus(userId)


    }

    render() {

        return (
            <Profile  {...this.props} profile={this.props.profile} status={this.props.status}
                      updateStatus={this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withAuthRedirect,
    withRouter,
)(ProfileContainer)
