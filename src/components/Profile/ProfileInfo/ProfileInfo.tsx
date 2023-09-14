import React from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileContainerType} from "../ProfileContainer";
import {ProfileStatusWithHooks} from "../../../components/Profile/ProfileInfo/ProfileStatusWithHooks";

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
                <img src={profile.photos.large} alt={'profile photo'}/>
                <ProfileStatusWithHooks status={'Hello my friends'} updateStatus={updateStatus}/>
                <div>
                    {profile.aboutMe}
                </div>


                ava+description
            </div>
        </div>
    )

}