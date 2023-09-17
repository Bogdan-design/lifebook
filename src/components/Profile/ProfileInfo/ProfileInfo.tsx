import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileContainerType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";
import usersPhoto from "../../../assets/imeges/avatar.jpg";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileContainerType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File) => void
}


export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            debugger
            savePhoto(e.target.files[0])
        }
    }

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || usersPhoto} alt={'profile photo'} className={s.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatus status={status} updateStatus={updateStatus}/>
                <div>
                    {profile.aboutMe}
                </div>
                ava+description
            </div>
        </div>
    )

}