import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redaxStore";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {UserPhotosType} from "../../api/api";
import {FormType} from "../../components/Profile/ProfileInfo/ProfileDataForm";


export type ContactsType = {
    [key: string]: string
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string

}

export type ProfileContainerType = {
    aboutMe?: string | undefined
    contacts?: ContactsType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string,
    fullName?: string
    id?: number | null
    photos: UserPhotosType
}
type PathParamsType = {
    userId: string
}
type MapDispatchPropsType = {
    getUserProfile: (id: number) => void
    getStatus: (id: number) => void
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File | null) => void
    saveProfile:(data: FormType) => void
}
type MapStatePropsType = {
    profile: ProfileContainerType | null,
    status: string
    authorizedUserId: number | null
}
type OwnPropsType = MapDispatchPropsType & MapStatePropsType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType


class ProfileContainer extends React.Component<PropsType, OwnPropsType> {
    refreshProfile = () => {
        let userId = Number(this.props.match.params.userId)
        if (!userId && this.props.authorizedUserId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }


    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps:Readonly<PropsType>) {
        if(this.props.match.params.userId !== prevProps.match.params.userId ) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <Profile  {...this.props}
                      saveProfile={this.props.saveProfile}
                      isOwner={!this.props.match.params.userId}
                      profile={this.props.profile}
                      status={this.props.status}
                      updateStatus={this.props.updateStatus}
                      savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus,savePhoto,saveProfile}),
    withAuthRedirect,
    withRouter,
)(ProfileContainer)
