export interface Profile {
    id: number;
    fullname: string;
    gender: string;
    birthday: string;
    avatar: string;
}

export interface ProfileParams {
    fullname: string;
    gender: string;
    birthday: string;
    avatar: string;
}

export interface ChangePasswordParams {
    oldPassword: string;
    newPassword: string;
}
