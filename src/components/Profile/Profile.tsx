import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileContainerType} from "../../components/Profile/ProfileContainer";

type ProfilePropsType ={
    isOwner:boolean
    profile: ProfileContainerType | null
    status: string
    updateStatus: (status:string)=>void
    savePhoto: (newPhoto: File) => void
}


export const Profile: React.FC<ProfilePropsType> = ({isOwner,profile,updateStatus,status,savePhoto}) => {


    return (
        <div>
            <ProfileInfo isOwner={isOwner}
                         profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         savePhoto={savePhoto}
            />
            <MyPostsContainer  />
        </div>
    )
}