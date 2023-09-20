import axios from "axios";
import {InitialStateType} from "../redux/authReducer";
import {ContactsType, ProfileContainerType} from "../components/Profile/ProfileContainer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "bba7ea60-9253-4115-b214-3edd705bef65"
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    followAPI(id: number) {
        return instance.post<FollowResponseType>(`follow/${id}`)
            .then(res => res.data)
    },
    unfollowAPI(id: number) {
        return instance.delete<FollowResponseType>(`follow/${id}`)
            .then(res => res.data)
    },
    getProfile(userId: number | null) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId)
    },
}
export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileContainerType>(`profile/${userId}`)
        // .then(res=>res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<FollowResponseType>(`profile/status`, {status})
    },
    putPhoto(newPhoto: File) {
        const formData = new FormData()
        formData.append('image', newPhoto)
        return instance.put<FollowResponseType<Data>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    putProfile(profile: RequestProfileType) {
        return instance.put<FollowResponseType>('profile', profile)
    }
}

export const authAPI = {
    me() {
        return instance.get<FollowResponseType<InitialStateType>>(`auth/me`)
    },
    login({password, rememberMe = false, email, captcha = null}: LoginType) {
        return instance.post<FollowResponseType<{ userId: number }>>('auth/login', {
            password,
            rememberMe,
            email,
            captcha
        })
    },
    logOut() {
        return instance.delete<FollowResponseType>('auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<ResponseCaptchaType>(`security/get-captcha-url`)
    },
}

// type
export type ResponseCaptchaType = {
    url: string
}

export type UserPhotosType = {
    small: string
    large: string
}
export type UsersFromServerType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: UserPhotosType
    status: string
    followed: boolean
}
type GetUsersType = {
    items: UsersFromServerType[]
    totalCount: number
    error: string
}
type FollowResponseType<D = {}> = {
    resultCode: number
    messages: string [],
    data: D
}

export type Data = {
    photos: UserPhotosType;
}


export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string | null
}

export type RequestProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType

}
