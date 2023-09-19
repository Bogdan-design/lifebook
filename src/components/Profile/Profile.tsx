import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileContainerType} from "../../components/Profile/ProfileContainer";
import {FormType} from "../../components/Profile/ProfileInfo/ProfileDataForm";

type ProfilePropsType ={
    isOwner:boolean
    profile: ProfileContainerType | null
    status: string
    updateStatus: (status:string)=>void
    savePhoto: (newPhoto: File) => void
    saveProfile:(data: FormType) => Promise<{code: number}>
}


export const Profile: React.FC<ProfilePropsType> = ({isOwner,profile,updateStatus,status,savePhoto,saveProfile}) => {


    return (
        <div>
            <ProfileInfo isOwner={isOwner}
                         profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
            />
            <MyPostsContainer  />
        </div>
    )
}