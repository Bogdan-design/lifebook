import React from "react";
import s from "./ProfileInfo.module.css"
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileContainerType} from "../ProfileContainer";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoPropsType = {
    profile: ProfileContainerType | null
    status:string
    updateStatus: (status:string)=>void
}


export const ProfileInfo = (props: ProfileInfoPropsType) => {

    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus status={'Hello my friends'} updateStatus={props.updateStatus}/>
                <div>
                    {props.profile.aboutMe}
                </div>


                ava+description
            </div>
        </div>
    )

}