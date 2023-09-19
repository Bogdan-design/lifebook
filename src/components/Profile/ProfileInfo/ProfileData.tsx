import {ProfileContainerType} from "../../Profile/ProfileContainer";
import {Contact} from "./Contacts";
import React from "react";

export const ProfileData = (props:{profile: ProfileContainerType,isOwner:boolean, goToEditMode:()=>void }) => {
    const {profile,isOwner,goToEditMode}=props
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>Edite</button>
        </div>}
        <div>
            <b>Full name:</b>{profile.fullName && profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b>{profile.lookingForAJob ? ' Yes' : ' No'}
        </div>
        {profile.lookingForAJob && <div><b>My professional skills:</b>{profile.lookingForAJobDescription}</div>}
        <div>
            <b>About me:</b>{profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}