import React from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileContainerType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";
import usersPhoto from "../../../assets/imeges/avatar.jpg";

type ProfileInfoPropsType = {
    profile: ProfileContainerType | null
    status: string
    updateStatus: (status: string) => void
}


export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || usersPhoto} alt={'profile photo'} className={s.mainPhoto}/>
                <ProfileStatus status={status} updateStatus={updateStatus}/>
                <div>
                    {profile.aboutMe}
                </div>
                ava+description
            </div>
        </div>
    )

}