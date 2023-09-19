import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileContainerType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";
import usersPhoto from "../../../assets/imeges/avatar.jpg";
import {FormType, ProfileDataReduxForm} from "./ProfileDataForm";
import {ProfileData} from "./ProfileData";

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileContainerType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (newPhoto: File) => void
    saveProfile:(data: FormType) => Promise<{code: number}>
}


export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            debugger
            savePhoto(e.target.files[0])
        }
    }

    if (!profile) {
        return <Preloader/>
    }

    const onSubmit = (formData: FormType) => {

        saveProfile(formData).then(res => {
            if(res.code === 0) {
                setEditMode(false)
            }
        })
    }

    const openForm = () => setEditMode(true);

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || usersPhoto} alt={'profile photo'} className={s.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                {editMode ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} isOwner goToEditMode={openForm}/>}
                <ProfileStatus status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )

}




